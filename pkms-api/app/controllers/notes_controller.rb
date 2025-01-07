class NotesController < ApplicationController
  # This is a before_action that restricts access to the NotesController to authenticated users.
  # Don't forget- before_action is used to call a method before a controller action is used.
  before_action :authenticate_user!

  # For this one, we want to make sure a user sees only their notes.
  before_action :set_note, only: [:show, :update, :destroy]

  #making some notes to help me remember how things work.

  # So, these methods have corresponding crud requests in the routes for my notes.
  # I specified what routes I expect to have at this endpoint there and then add them here and flesh out the expected behavior.
  # These methods take advantage of active record methods- We call Note and then a method.

  # Index shows all my Notes
  # Uses all to retrieve all rows from the notes table
  # We also include each note's tags.
  def index
    @notes = current_user.notes.includes(:tags)
    render json: @notes, include: { tags: {methods: :instance_id}}
  end

  # The show method shows a single note
  # Uses find(id) to grab the specific note with corresponding ID
  def show
    @note = Note.find(params[:id])
    render json: @note, include: { tags: {methods: :instance_id}}
  end

  # creates a new note. Note that we use the note_params to make sure we're safely handling input parameters. Those are defined
  # privately below.
  # new isntantiates a new object without saving it to the database (follow-up with save to save it)
  # create instnatiates and saves in a single step (i.e. Note.create(note_params))
  def create

    @note = Note.new(note_params)
    #note that we're doing .save here to save the newly created note_paramsed Note
    if @note.save
      render json: @note.as_json(include: :tags), status: :created
    else
      render json: @note.errors, status: :unprocessable_entity
    end
  end

  def update
    @note = Note.find(params[:id])
    # update updates one or more attributes from a record.
    if @note.update(note_params)
      render json: @note
    else
      render json: @note.errors, status: :unprocessable_entity
    end
  end

  # destroy: AR method to delete a record.
  def destroy
    @note = Note.find(params[:id])
    @note.destroy
    head :no_content
  end

  # This is a custom action used in the routes. It allows us to filter by tags!
  # todo: go over syntax for this method so I understand it.
  def filter_by_tags
    if params[:tag_ids]
      tag_ids = params[:tag_ids].split(",") # Example: ?tag_ids=1,2,3
      #todo: figure out what the difference is between joins and includes?
      @notes = Note.joins(:tags).where(tags: { id: tag_ids }).distinct
      render json: @notes
    else
      render json: { error: 'No tag IDs provided' }, status: :unprocessable_entity
    end
  end

  private

  # strong params!
  def note_params
    params.require(:note).permit(:title, :content, :user_id )
  end

  # This makes sure a user can only access their own notes!
  # If there's no current user, we display an error.
  def set_note
    @note = @current_user.notes.find_by(id: params[:id])
    render json: { error: 'Not Found' }, status: :not_found unless @note
  end

end
