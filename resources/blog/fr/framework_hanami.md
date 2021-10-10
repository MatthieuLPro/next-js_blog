---
title: 'Aperçu du framework web Hanami'
date: '03 août, 2021'
categories: ['web']
readTime: '3 minutes'
displayRank: 1
---
<p align="center">
  <img src="../images/hanami_introduction_logo.jpg" title="Logo du framework Hanami" alt="Logo du framework Hamani" />
  <figcaption style="text-align: center; font-size: 15px"><em>Logo du framework Hanami</em></figcaption>
</p>
Dans le but d'extraire une partie de l’architecture Ruby on rails d'une application, j’ai été sensibilisé à différentes notions que l’on retrouve dans le framework Hanami.

En effet, quelques problèmes sont apparues, comme :

- Apparition de nombreux Gods objects
- Classes possédants un rôle mal défini
- Difficulté de test unitaire due à des couplages trop fort

Cet article présente un aperçu du framework pour mieux comprendre comment une partie de sa logique a pu répondre aux attentes.

# Hanami, c'est quoi ?
Hanami est un framework web pour le langage ruby se basant sur **l'hexagonal architecture**.
<p align="center">
  <img src="../images/hanami_introduction_hexagonal_architecture.jpg" title="Schema de l'hexagonal architecture" alt="Schema de l'hexagonal architecture" />
  <figcaption style="text-align: center; font-size: 15px"><em>Schéma de l'hexagonal architecture</em></figcaption>
</p>

Cette structure permet de séparer la logique métier propre à l'application (*comprend les classes entities, interactors et repositories*) et la façon dont on présente les données à l’extérieur (*par exemple un client web ou une base de données comme data source*).

Un projet Hanami possède les fichiers suivants :
```
├── Gemfile
├── README.md
├── Rakefile
├── apps
├── config
├── config.ru
├── db
├── lib
├── public
└── spec
```
Pour la suite nous allons nous concentrer sur 2 fichiers importants : <br />La **lib** et l'**apps**.
### Fichier lib
Rassemble toute la logique métier de notre application. Il comprend notamment les classes de type **entities** (*rassemblant la logique métier*) et **repositories** (*interface entre nos entities et les data sources*).
```
lib
├── bibliotheque
│   ├── entities
│   │   └── livre.rb
│   │   └── auteur.rb
│   │   └── editeur.rb
│   ├── mailers
│   │   └── templates
│   └── repositories
│   │   └── livre_repository.rb
└── bibliotheque.rb
```
Nous avons ici le domaine bibliotheque qui peut rassembler une multitude d'entities (*livres, auteurs, éditeur, ...*) et les repositories permettant d'agréger les entities à partir des data sources.
### Fichier apps 
Rassemble la logique de communication entre nos domaines métiers (*la lib*) et l'extérieur. Il comprend notamment les classes de type **controllers**, **views** et le **router**.
```
apps
└── web
    ├── application.rb
    ├── assets
    │   ├── favicon.ico
    │   ├── images
    │   ├── javascripts
    │   └── stylesheets
    ├── config
    │   └── routes.rb
    ├── controllers
    ├── templates
    │   └── application.html.erb
    └── views
        └── application_layout.rb
```
L'exemple ci-dessus nous donne la communication avec une interface web. Mais l'idée est de pouvoir connecter nos domaines à plusieurs interfaces (*un admin, une api, etc ...*).
# Du code concret
### Controller
L'exemple ci-dessous est l'end-point de création d'un livre.
```ruby
# apps/web/controllers/livres/create.rb
module Web
  module Controllers
    module Livres
      class Create
        include Web::Action

        expose :livre

        params do
          required(:livre).schema do
            required(:titre).filled(:str?)
            required(:auteur).filled(:str?)
          end
        end

        def call(params)
          if params.valid?
            @livre = LivreRepository.new.create(params[:livre])

            redirect_to '/livres'
          else
            self.status = 422
          end
        end
      end
    end
  end
end
```
Cette classe peut se diviser en 3 parties : 
- **Expose** : Qui permet de rendre accessible la variable <span style="color: red">`@livre`</span> à l'extérieur.
- **Schema** : Ce que l'on peut appeler un contrat, les paramètres doivent posséder l'attribut <span style="color: red">`:livre`</span> qui possède lui-même les attributs <span style="color: red">`:titre`</span> et <span style="color: red">`:auteur`</span>. Auquel cas l'appel ne sera pas valide.
- **Call** : La fonction principale qui fait appel à des objets de la couche métier de notre architecture. On appelle ici le repository du model Livre pour faire persister un nouveau livre dans la data source.

Le controller fait office de façade de communication entre l'extérieur et le coeur de notre application (*qui est la partie métier*). 
### Repository
Lisons cette classe repository (*qui est appelé par l'end-point create*) :
```ruby
# lib/bibliotheque/repositories/livre_repository.rb
class LivreRepository < Hanami::Repository
  def plus_recent_par_auteur(auteur, limite: 8)
    livres
      .where(auteur_id: auteur.id)
      .order(:publie_le)
      .limit(limite)
  end
end
```
Nous avons ici une méthode qui permet d'obtenir une liste limitée des livres d'un auteur triés par date de publication. Ce repository hérite de <span style="color: red">`Hanami::Repository`</span> qui lui permet d'avoir quelques méthodes de base comme les opérations CRUD.

Le repository est une façade de communication entre le coeur de notre application et l'extérieur (*une data source*). À noter que le repository doit être **agnostique** : il n'est pas couplé à une data source en particulier.
### Entity
L'entity est la classe qui renferme toute la logique d'un objet représentant un besoin métier.
```ruby
# lib/bibliotheque/entities/auteur.rb
class Auteur < Hanami::Entity
  EMAIL_FORMAT = /\@/

  attributes :strict do
    attribute :id,    Types::Strict::Int
    attribute :nom,  Types::Strict::String
    attribute :email, Types::Strict::String.constrained(format: EMAIL_FORMAT)
    attribute :age,   Types::Strict::Int.constrained(gt: 18)
  end
end
```
Cet objet représente un objet réel avec des attributs et des comportements cohérents.

Et voilà ! J'espère que cet aperçu vous donnera envie de continuer la découverte de ce framework.
# Pour aller plus loin
Nous avons vu ensemble son architecture de base inspirée de l'**architecture hexagonale** et quelques classes essentielles au sein de l'application.
Le fort découplage des classes et leur rôle clairement attribué permettent une bonne organisation et un testing simple. 

Pour continuer votre exploration, le site officiel propose un guide pas à pas pour directement mettre les mains dans le cambouis. Egalement, s’informer sur l’[architecture hexagonale](https://blog.octo.com/architecture-hexagonale-trois-principes-et-un-exemple-dimplementation/) permets de mieux saisir l’ensemble.

Merci d'avoir lu cet article.
# Sources
- [Hanami - The web, with simplicity](https://hanamirb.org/)
- [Hanami - Tutoriel pas à pas](https://guides.hanamirb.org/v1.3/introduction/getting-started/)
- [Netflix tech blog - Ready for changes with hexagonal architecture](https://netflixtechblog.com/ready-for-changes-with-hexagonal-architecture-b315ec967749)
