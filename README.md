# code-visualizer-frontend

# Table of contents
* [General](#general)
* [Installation](#install)
* [Usage](#usage)

# <a id="general">Project Description</a>
This repository is one of three essential parts of the **CodeVisualizer** diploma project, namely the Code Visualizer frontend part. For the sake of portability and modular development, all the three parts have been placed it distinct repositories. You can also observe the CodeVisualizerServer implementation <a href="https://github.com/Asterka/code-visualizer-server">in code-visualization-server</a> and CodeVisualizerMobileApplication <a href="https://github.com/Asterka/codeVizualizer">in code-visualizer-mobile-app</a> repositories.

# <a id="install">Installing the front-end application</a>
Prerequisites:
1. **NPM** and **NodeJS** installed in your system.

Since this application was developed with npm package manager, we recommend first installing the npm. When you've done that, just clone this repo and run:
> 
> **npm install**

If everything goes right, you're now ready to run the app itself.
In order to run the app, run: 

> **npm run start**
> 
This will run the create-react-app start script from react-scripts.

In case you want to run your app on a special port, that is different from create-react-app original port, you might want to read this [post](https://stackoverflow.com/questions/40714583/how-to-specify-a-port-to-run-a-create-react-app-based-project)


# <a id="usage">Use the frontend</a>
When you've started your project you should see the detailed description of the local adress, where you can access the product.

> Compiled successfully!
> 
> You can now view code-visualizer-frontend in the browser.
> 
>   Local:            http://localhost:3000
>   On Your Network:  http://X.X.X.X:3000
> 
> 

![](https://i.imgur.com/Qe5cjp6.jpg)

*Ref. pic 1: Project running locally on localhost:3000*

> 
> ### Keep in mind
> When the project is run for the first time it will generate the user token, which then will be stored in the local storage of your browser. All user files will be saved under that token, as a unique identifier. When accessing your projects in the future, one should use the same user token. On this stage of development, no authorization mechanisms have been introduced to the applications.

On the left hand, you can see the interaction panel. Here you can upload the project, choose the project to visualize. First button will trigger the system upload mechanisms, that only allow ***.jar*** files. 