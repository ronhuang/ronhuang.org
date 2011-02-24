# adapted from  http://github.com/appden/appden.github.com/blob/master/Rakefile

require 'packr'
require 'rake/clean'

desc 'Build site with Jekyll'
task :build => :clean do
  # compile site
  jekyll
end

desc 'Start server'
task :server => :clean do
  jekyll('--server')
end

desc 'Build and deploy'
task :deploy => :build do
  sh 'rsync -rtzhavz _site/ ronhuang@ewok.ronhuang.org:http/nginx'
end

desc 'Begin a new post'
task :post do
  ROOT_DIR = File.dirname(__FILE__)

  title = ARGV[1]
  tags = ARGV[2 ]

  unless title
    puts %{Usage: rake post "The Post Title"["Tag 1, Tag 2"]}
    exit(-1)
  end

  datetime = Time.now.strftime('%Y-%m-%d')  # 30 minutes from now.
  slug = title.strip.downcase.gsub(/ /, '-')

  # E.g. 2006-07-16_11-41-batch-open-urls-from-clipboard.markdown
  path = "#{ROOT_DIR}/_posts/#{datetime}-#{slug}.markdown"

  header = <<-END
---
title: #{title}
tags:  [#{tags}]
layout: post
description: Description Content
comments: false
---

END

  File.open(path, 'w') {|f| f << header }
  system("emacsclient", "-n", "-a", "emacs", path)
end

task :default => :server

# clean deletes built copies
CLEAN.include(['_site/'])

def jekyll(opts = '')
  sh 'jekyll ' + opts
end

def minify()
  # minify javascript
  source = File.read('_site/assets/themes/default/js/site.js')
  minified = Packr.pack(source, :shrink_vars => true, :base62 => false)
  header = /\/\*.*?\*\//m.match(source)

  # inject header into minified javascript
  File.open('_site/assets/themes/default/js/site.min.js', 'w') do |combined|
    combined.puts(header)
    combined.write(minified)
  end
end
