class TagsController < ApplicationController

  def index
    # Fetch tags specific to the logged-in user
    @tags = current_user.tags
    render json: @tags
  end

  def show
    # Ensure the tag belongs to the current user
    @tag = current_user.tags.find(params[:id])
    render json: @tag
  end

  def create
    # Create a new tag for the current user
    @tag = current_user.tags.build(tag_params)

    if @tag.save
      render json: @tag, status: :created
    else
      render json: @tag.errors, status: :unprocessable_entity
    end
  end

  def update
    # Only update a tag that belongs to the current user
    @tag = current_user.tags.find(params[:id])

    if @tag.update(tag_params)
      render json: @tag
    else
      render json: @tag.errors, status: :unprocessable_entity
    end
  end

  def destroy
    # Only destroy a tag that belongs to the current user
    @tag = current_user.tags.find(params[:id])
    @tag.destroy
    head :no_content
  end

  private

  def tag_params
    # No user_id needed anymore
    params.require(:tag).permit(:name)
  end
end