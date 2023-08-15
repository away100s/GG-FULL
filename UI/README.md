# Tokopedia Play Clone Frontend Code Documentation

## Helloo

Welcome to the documentation of the frontend code for the **Tokopedia Play Clone** project. This documentation aims to provide you with a comprehensive understanding of the project's frontend structure, technologies used, integration details, architecture, API communication, folder structure, components, and more.

## Table of Contents

1. [Introduction](#introduction)
2. [Product Overview](#product-overview)
3. [Technologies Used](#technologies-used)
4. [Integration](#integration)
5. [Application Architecture](#application-architecture)
6. [API and Backend Communication](#api-and-backend-communication)
7. [Folder Structure](#folder-structure)
8. [Types of Objects](#types-of-objects)
9. [Important Modules and Routes](#important-modules-and-routes)
10. [Testing Approach](#testing-approach)
11. [Frequently Asked Questions](#frequently-asked-questions)

## 2. Product Overview

The **Tokopedia Play Clone** is a web application designed to replicate the core functionalities of the Tokopedia Play platform. It enables users to watch videos, view video details, post comments, and interact with related products. This platform serves as a hub for users interested in watching videos and exploring related products.

## 3. Technologies Used

- React: JavaScript library for building user interfaces.
- React Router: Routing library for managing navigation and views.
- Chakra UI: Component library for consistent and responsive UI design.
- Axios: HTTP client for making API requests.
- EventSource: Web API for server-sent events (SSE).
- Context API: For state management and sharing data across components.

## 4. Integration

The frontend of the **Tokopedia Play Clone** runs within users' web browsers. It communicates with the backend server using API requests. The frontend is integrated with the backend through HTTP API endpoints for fetching video details, comments, and products, as well as posting new comments.

## 5. Application Architecture

**Application Architecture:**

The application architecture follows a modern and modular design, utilizing React and various libraries to achieve a seamless user experience. The frontend code is structured around components, pages, and contexts, which interact with each other to create a cohesive user interface.

1. **Components:** The heart of the architecture, components are reusable UI building blocks. They are located in the `components` folder and include elements such as `VideoItem`, `CommentForm`, `ProductList`, and more. These components are responsible for rendering specific parts of the UI and handling user interactions.

2. **Pages:** Top-level views of the application are defined in the `pages` folder. Examples include `Homepage` and `VideoDetailPage`. These pages compose the overall structure of the application and integrate various components to create complete user experiences.

3. **Hooks and Contexts:** The `hooks` and `contexts` folders contain logic for managing state and data fetching. The `useVideoList` hook fetches video data, while the `VideoContext` manages global state related to videos. The `useComment` and `useVideoDetail` hooks handle comment and video detail data, respectively. These hooks, along with the `VideoProvider`, enable components to access and update shared data.

4. **API Communication:** Axios is used to communicate with the backend server through RESTful API endpoints. The hooks use Axios to fetch data, such as videos, comments, and video details. Additionally, the application uses EventSource to receive real-time updates for comments through server-sent events (SSE).

5. **Routing:** The `react-router-dom` library manages routing within the application. The `App` component defines routes for the `Homepage`, `VideoDetailPage`, and other views. The `PageNav` component provides navigation links, and the `Routes` component determines which page to render based on the URL.

6. **Styling:** Chakra UI is used for consistent and responsive UI design. Styling is modular and component-based, contributing to a polished user interface.

**Interaction Flow:**

1. Users access the application through the `Homepage`, which displays a list of videos using the `VideoList` component.

2. When a user clicks on a video item, they are directed to the `VideoDetailPage`, where the `VideoPlayer`, `CommentList`, and `ProductList` components are displayed.

3. The `VideoPlayer` component renders the YouTube video player, allowing users to watch videos.

4. The `CommentList` component fetches and displays comments associated with the video using the `useComment` hook. It also utilizes SSE to update in real-time when new comments are posted.

5. The `ProductList` component fetches and displays related products using the `useVideoDetail` hook.

6. Users can interact with components, such as posting comments using the `CommentForm` component.

7. The global state for videos is managed by the `VideoContext`, accessible by various components throughout the application.

**In summary, the architecture combines components, hooks, contexts, routing, and libraries to create a dynamic and interactive frontend for the Tokopedia Play Clone project.**

## 6. API and Backend Communication

The frontend communicates with the backend server using RESTful API endpoints. These endpoints enable the retrieval of video details, comments, products, and the posting of new comments. The frontend uses Axios to make HTTP requests to the backend, and it also utilizes EventSource for real-time updates through server-sent events (SSE).

## 7. Folder Structure

```
src/
├── assets/
├── components/
│   ├── CommentForm.jsx
│   ├── CommentItem.jsx
│   ├── CommentList.jsx
│   ├── Footer.jsx
│   ├── Logo.jsx
│   ├── PageNav.jsx
│   ├── ProductItem.jsx
│   ├── ProductList.jsx
│   ├── ScrollToTop.jsx
│   ├── SearchBar.jsx
│   ├── VideoItem.jsx
│   ├── VideoList.jsx
│   ├── VideoPlayer.jsx
├── contexts/
│   ├── VideoContext.jsx
├── hooks/
│   ├── useComment.jsx
│   ├── useVideoDetail.jsx
│   ├── useVideoList.jsx
├── pages/
│   ├── Homepage.jsx
│   ├── VideoDetailPage.jsx
├── App.jsx
├── main.jsx
```

## 8. Types of Objects

- **Components**: Reusable UI elements that encapsulate specific functionality.
- **Hooks**: Custom hooks for managing state and fetching data.
- **Contexts**: Context providers and hooks for sharing data across components.
- **Pages**: Top-level components that represent different views of the application.

## 9. Important Modules and Routes

- **Homepage**: The landing page of the application that displays a list of videos.
- **VideoDetailPage**: The page that displays video details, comments, products, and the video player.

## 10. Testing Approach

The project follows a testing approach that includes:

- **Unit Tests**: Testing individual components and hooks in isolation.
- **Integration Tests**: Testing the interaction between components and context providers.
- **End-to-End (E2E) Tests**: Simulating user interactions across multiple components and views.

Tests are written using testing libraries such as Jest and React Testing Library.

## 11. Frequently Asked Questions

Q1: How do I start the development server?
A: Run `npm start` in the project directory to start the development server.

Q2: How are comments updated in real-time?
A: Comments are updated in real-time using server-sent events (SSE) to receive new comments from the backend.

Q3: How do I add a new component?
A: Create a new component file in the `components` directory and import it where needed.

Q4: Where can I find API requests?
A: API requests are made using the Axios library. Check component files such as `CommentList.jsx` for examples.

Q5: How is state managed in the application?
A: State is managed using the Context API. The `VideoContext.jsx` provides a centralized state for video-related data.

---
