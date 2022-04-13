## Introduction

This app was adapted from a video streaming app built within a React/Redux course. The original streaming app focused on techniques needed to combine these two technologies and allowed users to sign in via Google Auth and perform CRUD operations, ie. create, read, update and delete records. The records created in the original app were streams; this codebase was modified substantially and adapted into an app that lets create a personal book collection. A component that searches the Google Books API was custom designed for this app, and lets users search for a book by title keywords, browse a list of seach results and add books to their collection.

React components are used within the app and React-Router-DOM allows users to switch between these pages and components seamlessly, without refreshing the browser. Instead of storing data in component state (memory linked to individual components), it is maintained in the Redux Store acting as a central store of data. This reduces app complexity by enabling components to easily access shared data and eliminates the need to pass data between specific, nested components. This greatly simplifies app architecture and makes access to data much more straightforward.

This app also makes use of a ready-made API that makes use of RESTful conventions and enables CRUD operations to be made within the app (Create, Read, Update and Delete) and thereby create persistent data, in this case stored in a JSON file. The API code is quite basic and has not been uploaded to GitHub.

This app is hosted on Heroku for free, and Heroku's servers refresh once or twice per day so any books added will be lost. Please feel free to login and test this out.

## Main Technologies

# React

React was used to create components within the app. These components are written in JSX, a markup language, and this is then converted to html in the browser via Babel.

# Redux

Redux is a platform agnostic technology that allows the storing of data in a central repository, and provides access to this data to components within an application. Redux works with Action Creators and Reducers to load and maintain a store of data within the user's device memory. Once a React component is wired up to the Redux store, it can access data within the store and make use of Action Creators to initiate the creation, retrieval, updating and deletion of this data. These Action Creators then pass this data on to Reducers to finalise the processing of this data.

## Additional Node Modules and Add-ons

-  Axios
   Axios was used to make asynchronous requests (ie. requests that take a finite amount of time) to our API server

-  JSON-Server
   This is a popular server based on RESTful conventions, this was used to power CRUD operations within the app

-  React-Final-Form
   This library enables and greatly simplifies the process of creating forms within the React-Redux ecosystem

-  React Portals
   React portals enable the creation of a Modal component. Portal components are not nested in the component hierarchy but can be inserted directly into the index.html file

-  React-Router-DOM
   This library was used to map paths to routes. This lets us specify what components will be loaded at specific urls

-  Redux-Thunk
   A library that enables the processing of asynchronous requests within Redux, ie. requests made to an API or external data source

## Main Folders

# Root-level Folders

-  client:
   All code and componentry related to the React-Redux side of the application

-  api:
   Code related to the API server, powered by JSON-Server

# Folders within the src parent dir (within the client parent dir):

-  actions:
   This folder contains all action creators

-  apis:
   Axios clients, ie. functions that form the basis for requests made in this case to our api

-  components:
   All React components in this app

-  reducers:
   All Redux reducers

## Additional Files

-  history.js:
   This file lets us bypass the default router BrowserRouter and manually create our own history object to enable programmatic navigation from within Redux action creators, ie. create custom redirects when certain actions occur. These redirects cannot be initiated from within action creators by using the standard BrowserRouter history obj.
