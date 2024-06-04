class Link < ApplicationRecord
  belongs_to :user

  SOCIAL_MEDIA_LOGOS = {
    'facebook' => 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/Colored_Facebook3_svg-1024.png',
    'twitter' => 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Twitter_colored_svg-1024.png',
    'instagram' => 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Instagram_colored_svg_1-1024.png',
    'linkedin' => 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Linkedin_unofficial_colored_svg-1024.png',
    'youtube' => 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Youtube_colored_svg-1024.png',
    'tiktok' => 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Tiktok_colored_svg-1024.png',
    'snapchat' => 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Snapchat_colored_svg-1024.png',
    'pinterest' => 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Pinterest_colored_svg-1024.png',
    'twitch' => 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Twitch_colored_svg-1024.png',
    'whatsapp' => 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Whatsapp2_colored_svg-1024.png',
    'telegram' => 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Telegram_colored_svg-1024.png',
    'reddit' => 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Reddit_colored_svg-1024.png',
    'discord' => 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Discord_colored_svg-1024.png',
    'medium' => 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Medium_colored_svg-1024.png',
    'tumblr' => 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Tumblr_colored_svg-1024.png',
    'github' => 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Github_colored_svg-1024.png',
    'stackoverflow' => 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Stack_Overflow_colored_svg-1024.png',
    'behance' => 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Behance_colored_svg-1024.png',
    'dribbble' => 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Dribbble_colored_svg-1024.png',
    'vimeo' => 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Vimeo_colored_svg-1024.png',
    'soundcloud' => 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Soundcloud_colored_svg-1024.png',
    'spotify' => 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Spotify_colored_svg-1024.png',
    'apple' => 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Apple_colored_svg-1024.png',
    'google' => 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Google_colored_svg-1024.png',
    'microsoft' => 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Microsoft_colored_svg-1024.png'
  }.freeze

  before_save :set_logo_url

  private

  def set_logo_url
    self.logo_url = SOCIAL_MEDIA_LOGOS[self.platform]
  end
end
