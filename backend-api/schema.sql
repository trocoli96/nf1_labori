drop table if exists experience;
drop table if exists education;
drop table if exists user;


drop table if exists company;


create table company(
                        id integer not null primary key auto_increment,
                        company_name varchar(255) not null,
                        location varchar(255) not null,
                        overview text,
                        website varchar(255),
                        company_size varchar(255),
                        headquarters_location varchar(255),
                        founded_year varchar(255)
)

create table user(
                     id integer not null primary key auto_increment,
                     first_name varchar(255) not null,
                     last_name varchar(255) not null,
                     email varchar (255) not null,
                     password varchar(255) not null,
                     former_name varchar(255),
                     current_company integer,
                     headline varchar (255),
                     foreign key (current_company) references company (id)
    )

create table experience(
                           id integer not null primary key auto_increment,
                           title varchar(255) not null,
                           employment_type varchar(255),
                           company integer not null,
                           location varchar (255),
                           start_date date not null,
                           end_date date,
                           user_id integer not null,
                           headline varchar(255) not null,
                           description text,
                           foreign key (company) references company (id),
                           foreign key (user_id) references user (id)
)


create table education(
                          id integer not null primary key auto_increment,
                          school varchar(255) not null,
                          degree varchar(255),
                          field_of_study varchar(255),
                          start_year year,
                          end_year year,
                          grade varchar(255),
                          activities text,
                          description text,
                          user_id integer not null,
                          foreign key (user_id) references user (id)
)

alter table user add column updated_at timestamp default current_timestamp();
alter table user add column created_at timestamp default current_timestamp();
alter table experience add column updated_at timestamp default current_timestamp();
alter table experience add column created_at timestamp default current_timestamp();
alter table education add column updated_at timestamp default current_timestamp();
alter table education add column created_at timestamp default current_timestamp();

drop table if exists event;
drop table if exists comments;
drop table if exists likes;
drop table if exists posts;

create table posts(
                      id integer not null primary key auto_increment,
                      user_id integer not null,
                      post_text text not null,
                      created_at timestamp default current_timestamp() not null,
                      updated_at timestamp default current_timestamp() not null,
                      image_link varchar(255),
                      foreign key (user_id) references user (id)
)
create table likes(
                      id integer not null primary key auto_increment,
                      user_id integer not null,
                      post_id integer not null,
                      created_at timestamp default current_timestamp() not null,
                      updated_at timestamp default current_timestamp() not null,
                      foreign key (user_id) references user (id),
                      foreign key (post_id) references posts (id)
)
create table comments(
                         id integer not null primary key auto_increment,
                         author_id integer not null,
                         post_id integer not null,
                         comment_body text not null,
                         created_at timestamp default current_timestamp() not null,
                         updated_at timestamp default current_timestamp() not null,
                         foreign key (author_id) references user (id),
                         foreign key (post_id) references posts (id)
)
create table event(
                      id integer not null primary key auto_increment,
                      name varchar (255) not null,
                      user_id integer not null,
                      object_id varchar (255) not null,
                      object_type varchar (255) not null,
                      created_at timestamp default current_timestamp() not null,
                      updated_at timestamp default current_timestamp() not null,
                      foreign key (user_id) references user (id)
)

