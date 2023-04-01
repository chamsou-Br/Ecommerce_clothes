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
picture varchar(300),
prix double PRECISION ,
rang integer default 0, 
adore integer default 0
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


INSERT INTO produit (type, nom, descr, style, catgorie, marque, quantite, accessoire, picture , prix) 
VALUES ('vest', 'Blouson en jean', 'Aussi connue sous le nom de veste en jean, il s’agit d’une veste polyvalente et décontractée qui peut être portée avec de nombreuses tenues différentes.', 'classique', '', 'Adidas', 10, NULL, 'https://th.bing.com/th/id/R.0c4f4237b2069e12c60677fc705e7fba?rik=Tj7nt0WogiptNw&pid=ImgRaw&r=0',25.00),
('vest', 'Doudoune The North Face', 'Une veste dhiver chaude et isolante, souvent remplie de duvet ou d une isolation synthétique, qui est parfaite pour les activités en plein air par temps froid.', 'Classique', '', 'The North Face', 10, NULL, 'https://images.asos-media.com/products/patagonia-jackson-glacier-hooded-down-jacket-in-navy/8399218-1-navyblue?$n_640w$&wid=513&fit=constrain',44.50),
('vest', 'Veste en cuir Schott', 'Une veste en cuir de qualité supérieure, souvent associée à la culture moto , qui est durable et intemporelle', 'classique', '', 'Schott', 10, NULL, 'https://th.bing.com/th/id/R.299aaa107e55a8526ed74e0898ae81eb?rik=Qj0bbXwLOVZ7og&pid=ImgRaw&r=0',50.0);

INSERT INTO produit (type, nom, descr, style, catgorie, marque, quantite, accessoire, picture , prix) 
VALUES ('pantalon', 'jean slim', 'Un jean moulant qui épouse la silhouette et qui peut être porté avec nimporte quel haut décontracté', 'Urbain', 'Femme', 'Levi''s', 10, NULL, 'https://images.asos-media.com/products/stradivarius-jean-skinny-a-taille-tres-haute-bleu-moyen/203830635-1-blue?$n_480w$&wid=476&fit=constrain',25.00),
('pantalon', 'Le pantalon chino', 'Un pantalon léger et confortable, idéal pour les tenues décontractées ou professionnelles', 'Classique', 'Homme', 'Dockers', 10, NULL, 'https://www.kiabi.be/images/pantalon-chino-slim-gris-clair-vj070_121_frb3.jpg',45.5),
('pantalon', ' pantalon de survêtement', 'Un pantalon de sport confortable et décontracté, idéal pour les activités physiques ou pour les journées détente', 'Sportif', '', 'Adidas', 10, NULL, 'https://univers-crampons.fr/wp-content/uploads/2022/08/GK8824_3_APPAREL_On-Model_Standard-View_white.jpg',25.00),
('pantalon', 'Le pantalon en lin', 'Un pantalon élégant et léger en lin, parfait pour les occasions formelles ou les journées chaudes d''été', 'Estival', 'Femme', 'Ralph Lauren', 10, NULL, 'https://www.pimkie.fr/on/demandware.static/-/Sites-pimkie-master-catalog/default/dwc40e669f/images/141390_E29A07_portrait_HD_1.JPG',25.00);


INSERT INTO examplaire (produit, color, quantiteS, quantiteM, quantiteL, quantiteXL, quantiteXXL, quantiteXXXL)
VALUES (11, 'rouge', 5, 10, 7, 3, 0, 0),
(11, 'noir', 5, 10, 7, 3, 0, 5),
(11, 'blanc', 5, 10, 7, 3, 10, 0),
(11, 'bleu', 5, 10, 7, 3, 0, 0)
;