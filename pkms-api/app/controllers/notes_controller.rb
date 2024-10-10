class NotesController < ApplicationController

  #making some notes to help me remember how things work.

  # So, these methods have corresponding crud requests in the routes for my notes.
  # I specified what routes I expect to have at this endpoint there and then add them here and flesh out the expected behavior.
  # These methods take advantage of active record methods- We call Note and then a method.

  # Index shows all my Notes
  # Uses all to retrieve all rows from the notes table
  def index
    @notes = Note.all
    render json: @notes
  end

  # The show method shows a single note
  # Uses find(id) to grab the specific note with corresponding ID
  def show
    @note = Note.find(params[:id])
    render json: @note
  end

  # creates a new note. Note that we use the note_params to make sure we're safely handling input parameters. Those are defined
  # privately below.
  # new isntantiates a new object without saving it to the database (follow-up with save to save it)
  # create instnatiates and saves in a single step (i.e. Note.create(note_params))
  def create
    @note = Note.new(note_params)
    if @note.save
      render json: @note, status: :created
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

  private

  def note_params
    params.require(:note).permit(:title, :content, :date, :user_id)
  end

end
