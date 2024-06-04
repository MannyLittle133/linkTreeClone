class LinksController < ApplicationController
    before_action :set_user
    before_action :set_link, only: [:update, :destroy]
  
    def index
      @links = @user.links
      render json: @links
    end
  
    def create
      @link = @user.links.build(link_params)
      if @link.save
        render json: @link, status: :created
      else
        render json: @link.errors, status: :unprocessable_entity
      end
    end
  
    def update
      if @link.update(link_params)
        render json: @link
      else
        render json: @link.errors, status: :unprocessable_entity
      end
    end
  
    def destroy
      @link.destroy
      head :no_content
    end
  
    private
  
    def set_user
      @user = User.find(params[:user_id])
    end
  
    def set_link
      @link = @user.links.find(params[:id])
    end
  
    def link_params
      params.require(:link).permit(:title, :url, :platform, :logo_url)
    end
  end
  