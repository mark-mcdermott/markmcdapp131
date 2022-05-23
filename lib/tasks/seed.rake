namespace :seed do

  desc "reset dev db"
  task :reset_dev_db do
    Rake::Task['db:reset'].invoke
  end

  desc "reset prod db"
  task :reset_prod_db => :environment do
    User.destroy_all
  end

  desc "seed users"
  task :users => :environment do
    User.create([
      {username: "mark", password: "password"},
      {username: "tim", password: "password"},
      {username: "jane", password: "password"},
      {username: "jim", password: "password"},
      {username: "horton", password: "password"},
      {username: "keanu", password: "password"}
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
