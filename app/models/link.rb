class Link < ApplicationRecord
  belongs_to :user

  SOCIAL_MEDIA_LOGOS = {
    'Facebook' => 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/Colored_Facebook3_svg-1024.png',
    'Twitter' => 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Twitter_colored_svg-1024.png',
    'Instagram' => 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Instagram_colored_svg_1-1024.png',
    'Linkedin' => 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Linkedin_unofficial_colored_svg-1024.png',
    'Youtube' => 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Youtube_colored_svg-1024.png',
    'Tiktok' => 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Tiktok_colored_svg-1024.png',
    'Snapchat' => 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Snapchat_colored_svg-1024.png',
    'Pinterest' => 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Pinterest_colored_svg-1024.png',
    'Twitch' => 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Twitch_colored_svg-1024.png',
    'Whatsapp' => 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Whatsapp2_colored_svg-1024.png',
    'Telegram' => 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Telegram_colored_svg-1024.png',
    'Reddit' => 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Reddit_colored_svg-1024.png',
    'Discord' => 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Discord_colored_svg-1024.png',
    'Medium' => 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Medium_colored_svg-1024.png',
    'Tumblr' => 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Tumblr_colored_svg-1024.png',
    'Github' => 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Github_colored_svg-1024.png',
    'Stackoverflow' => 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Stack_Overflow_colored_svg-1024.png',
    'Behance' => 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Behance_colored_svg-1024.png',
    'Dribbble' => 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Dribbble_colored_svg-1024.png',
    'Vimeo' => 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Vimeo_colored_svg-1024.png',
    'Soundcloud' => 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Soundcloud_colored_svg-1024.png',
    'Spotify' => 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Spotify_colored_svg-1024.png',
    'Apple' => 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Apple_colored_svg-1024.png',
    'Google' => 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Google_colored_svg-1024.png',
    'Microsoft' => 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Microsoft_colored_svg-1024.png'
  }.freeze

  before_save :set_logo_url

  private

  def set_logo_url
    self.logo_url = SOCIAL_MEDIA_LOGOS[platform]
  end
end
