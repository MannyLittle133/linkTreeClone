class CustomDeviseController < Devise::RegistrationsController
    protected
  
    def set_flash_message!(key, kind, options = {})
      if request.format.json?
        message = find_message(kind, options)
        options[:message] = message if message.present?
      else
        super
      end
    end
end
  