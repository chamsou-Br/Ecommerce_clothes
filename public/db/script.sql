create table client (
    email character varying(30) primary key,
    prenom character varying(30) NOT NULL,
    nom character varying(30) NOT NULL,
    adresse character varying(200),
    telephone character varying(20),
    motdepasse character varying(300),
    picture character varying(500),
    type character varying(30)
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
accessoire varchar(40),
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
quantite  integer default 0,
picture varchar(300)
);

create table productsAccessoire (
    id SERIAL PRIMARY KEY,
    produit INT,
    accessoire INT,
    FOREIGN KEY (produit) REFERENCES produit(id),
    FOREIGN KEY (accessoire) REFERENCES accessoire(id)
);

create table examplaire (
id SERIAL primary key ,
produit integer REFERENCES produit(id),
color varchar(20),
size varchar(20),
qte integer default 0,
);


create table commande (
    id Serial primary key,
    client character varying(30) references client(email), ,
    nom character varying(30),
    prenom character varying(30),
    adresse character varying(200),
    telephone character varying(20),
    livraison timestamp without time zone,
    prix double precision,
    email character varying(50),
    etat character varying(30) DEFAULT 'EN_ATTENTE'::character varying
);

create table commandeProduits (
id SERIAL primary key ,
commande integer references commande(id),
produit integer references produit(id),
qte integer,
size varchar(20),
color varchar(20)
);

create table commandeAccessoires (
id SERIAL primary key ,
commande integer references commande(id),
produit integer references produit(id),
accessoire integer references accessoire(id),
qte integer
);


create table panier (
id SERIAL primary key ,
commande integer references commande(id),
produit integer references produit(id),
accessoire integer references accessoire(id),
combinaison integer references combinaison(id),
qte integer,
size varchar(20),
color varchar(20)
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

INSERT INTO client (type, nom, prenom, email, adresse, telephone, motDePasse, picture ) 
VALUES ('client','salah','falek','user1@gmail.com','Paris','0664827074','$2b$10$4M6t2/THE6k5nJMZloL6D.nNxLt2RmVxpCcwRzFOaOg7H3HMQZmo6','https://th.bing.com/th/id/OIP.8-24d462Al7n2nEWHu6AvAHaE8?w=296&h=184&c=7&r=0&o=5&dpr=1.1&pid=1.7');

INSERT INTO produit (type, nom, descr, style, catgorie, marque, quantite, accessoire, picture , prix)   
VALUES ('pantalon', 'Pantalon femme', 'Pantalon femme qui épouse la silhouette et qui peut être porté avec nimporte quel haut décontracté', 'Urbain', 'Femme', 'Levi''s', 10, true, 'https://i.pinimg.com/originals/f7/7e/c2/f77ec2a8bc81cc5d89b2ac4fc436c1a1.jpg',25.00),
('pantalon', 'jean slim', 'Pantalon femme qui épouse la silhouette et qui peut être porté avec nimporte quel haut décontracté', 'Urbain', 'Femme', 'Levi''s', 10, true, 'https://www.lahalle.com/dw/image/v2/BCHM_PRD/on/demandware.static/-/Sites-lahalle_master/default/dwdb69d692/jeans-slim-ceinture-gris-clair-femme-b-36165600125960015.jpg?sw=1404&sh=1404',40.00);

INSERT INTO accessoire (type, marque, quantity, prix,picture)   
VALUES ('ceinture', 'Gucci',10,13.00,'https://th.bing.com/th/id/OIP.osW0pBlggHevwFhAV5gpVgHaHa?pid=ImgDet&rs=1'),
('ceinture', 'Louis',15,15.00,'https://th.bing.com/th/id/OIP.ldVXB3iPYOUDNNcFJDUHewHaHa?pid=ImgDet&w=500&h=500&rs=1'),
(' nœud papillon', 'Dior',10,13.00,'https://th.bing.com/th/id/OIP.itoeJJAEmCdnipYKaKRnWQHaHk?pid=ImgDet&rs=1'),
(' nœud papillon', 'Hugo Boss',15,15.00,'https://th.bing.com/th/id/OIP.s4OFrFKDGJpvW4rMrhnr0gHaE6?pid=ImgDet&w=1978&h=1312&rs=1');


