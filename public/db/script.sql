create table client (
email character varying(30) primary key,
prenom character varying(30) not null,
nom character varying(30) not null ,
adresse character varying(200) ,
telephone character varying(20) ,
motDePasse character varying(16)
);

create table produit (
id SERIAL  primary key ,
type varchar(40) not null ,
titre varchar(50) not null,
descr varchar(100),
style varchar(40),
catgorie varchar(40),
marque varchar(40),
quantite  integer default 0,
accessoire integer references accessoire(id),
picture varchar(300)
);

create table accessoire(
id SERIAL  primary key ,
type varchar(40) not null ,
titre varchar(50) not null,
marque varchar(40),
quantity  integer default 0,
picture varchar(300)
);

create table examplaire (
id SERIAL primary key ,
produit integer REFERENCES produit(id),
color varchar(20),
quantiteS integer default 0,
quantiteM integer default 0,
quantiteL integer default 0,
quantiteXL integer default 0,
quantiteXXL integer default 0,
quantiteXXXL integer default 0
);

create table commande (
id Serial primary key,
client varchar(30) references client(email),
nom varchar(30),
prenom varchar(30),
adresse character varying(200) ,
telephone character varying(20),
livraison TIMESTAMP
);

create table panier (
id SERIAL primary key ,
commande integer references commande(id),
produit integer references produit(id),
accessoire integer references accessoire(id),
combinaison integer references combinaison(id)
);


create table combinaison (
id serial primary key,
prix DOUBLE PRECISION  ,
type varchar(50)
);

create table combinaisonProduit (
id serial primary key,
combinaison integer references combinaison(id),
produit integer references produit(id),
accessoire integer references accessoire(id)
)
