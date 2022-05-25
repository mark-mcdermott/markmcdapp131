namespace :seed do

  desc "reset dev db"
  task :reset_dev_db do
    Rake::Task['db:reset'].invoke
  end

  desc "reset prod db"
  task :reset_prod_db => :environment do
    Score.destroy_all
    User.destroy_all
  end

  desc "seed users"
  task :users => :environment do
    User.create([
      {username: "mark", password: "password", avatar: "https://cdn-qzukl19j.files-simplefileupload.com/static/blobs/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcVdwIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--a445c2ec87fd3834eb564ddd3d1517da6b60d278/headshot.jpg", admin: true},
      {username: "tim", password: "password", pravatar: 69, admin: false},
      {username: "jane", password: "password", pravatar: 49, admin: false},
      {username: "jim", password: "password", pravatar: 51, admin: false},
      {username: "horton", password: "password", pravatar: 50, admin: false},
      {username: "keanu", password: "password", pravatar: 54, admin: false}
    ])
  end

  desc "seed scores"
  task :scores => :environment do
    Score.create([
      {val: rand(1..1000), user_id: User.find(User.pluck(:id).sample).id},
      {val: rand(1..1000), user_id: User.find(User.pluck(:id).sample).id},
      {val: rand(1..1000), user_id: User.find(User.pluck(:id).sample).id},
      {val: rand(1..1000), user_id: User.find(User.pluck(:id).sample).id},
      {val: rand(1..1000), user_id: User.find(User.pluck(:id).sample).id},
      {val: rand(1..1000), user_id: User.find(User.pluck(:id).sample).id},
      {val: rand(1..1000), user_id: User.find(User.pluck(:id).sample).id},
      {val: rand(1..1000), user_id: User.find(User.pluck(:id).sample).id},
      {val: rand(1..1000), user_id: User.find(User.pluck(:id).sample).id},
      {val: rand(1..1000), user_id: User.find(User.pluck(:id).sample).id},
      {val: rand(1..1000), user_id: User.find(User.pluck(:id).sample).id},
      {val: rand(1..1000), user_id: User.find(User.pluck(:id).sample).id},
      {val: rand(1..1000), user_id: User.find(User.pluck(:id).sample).id},
      {val: rand(1..1000), user_id: User.find(User.pluck(:id).sample).id},
      {val: rand(1..1000), user_id: User.find(User.pluck(:id).sample).id},
      {val: rand(1..1000), user_id: User.find(User.pluck(:id).sample).id},
      {val: rand(1..1000), user_id: User.find(User.pluck(:id).sample).id},
      {val: rand(1..1000), user_id: User.find(User.pluck(:id).sample).id},
      {val: rand(1..1000), user_id: User.find(User.pluck(:id).sample).id}
    ])
  end

  desc "seed dev"
  task :dev do
    Rake::Task['seed:reset_dev_db'].invoke
    Rake::Task['seed:users'].invoke
    Rake::Task['seed:scores'].invoke
  end

  desc "seed prod"
  task :prod do
    Rake::Task['seed:reset_prod_db'].invoke
    Rake::Task['seed:users'].invoke
    Rake::Task['seed:scores'].invoke
  end

end
