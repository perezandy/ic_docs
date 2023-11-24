use leptos::*;
use leptos_meta::*;
use leptos_router::*;



// THIS IS THE ENTRY POINT FOR ALL FRONTEND use cargo leptos watch to start serving
// in a separate terminal, npx tailwindcss -i ./input.css -o ./style/output.css --watch

#[component]
pub fn App() -> impl IntoView {
    // Provides context that manages stylesheets, titles, meta tags, etc.
    provide_meta_context();

    view! {
        // injects a stylesheet into the document <head>
        // id=leptos means cargo-leptos will hot-reload this stylesheet
    

        <Stylesheet id="leptos" href="/pkg/leptos_start.css"/>

        // sets the document title
        

        // content for this welcome page
        <Router>
            <main>
                <Routes>
                    <Route path="/" view = HomePage/>
                   
                    <Route path = "/project_tutorial" view = ptStep1/>
                    <Route path = "/project_tutorial/step1" view = ptStep1/>
                    <Route path = "/project_tutorial/step2" view = ptStep2/>
                    <Route path = "/project_tutorial/step3" view = ptStep3/>
    
                    <Route path="/*any" view = NotFound/>
                </Routes>
            </main>
        </Router>
    }
}

/// Renders the home page of your application.
#[component]
fn HomePage() -> impl IntoView {
    view! {    
        <Title text="Iron Coder Documentation"/>
        <html>
            <head>
                
            </head>
            <body class ="bg-gray-100">
                <header class="bg-red-500 p-4 text-white flex items-center justify-center">
                    <h1 class="text-2xl font-semibold">Iron Coder</h1>
                </header>


                <nav class="bg-gray-500 text-white py-2 gap-4 p-8">
                    <ul class="flex space-x-20 justify-left">
                        <li><a href="https://github.com/shulltronics/iron-coder" class="hover:underline">GitHub</a></li>
                        <li><a href="#" class="hover:underline">Forums</a></li>
                        <li><a href="#" class="hover:underline">About</a></li>
                        <li><a href="#" class="hover:underline">Online Editor</a></li>
                    </ul>
                </nav>
                
                <div class="grid grid-cols-3 gap-4 p-4">
                    <div class="bg-gray-200 text-white text-center">
                        <h2 class="bg-gray-500 text-lg w-full p-2">Getting Started</h2>
                        <ul class="text-left text-black space-y-4 mt-2 ml-2 mb-2">
                            <li><a href="project_tutorial" class="hover:underline hover:text-blue-500 hover:border-b-2 border-transparent">Making your First Project</a></li>
                            <li><a href="#" class="hover:underline hover:text-blue-500 hover:border-b-2 border-transparent">Creating Custom Boards</a></li>
                            <li><a href="#" class="hover:underline hover:text-blue-500 hover:border-b-2 border-transparent">Generating code</a></li>
                            //TODO: make more pages and route them
                        </ul>
                    </div>
                    <div class="bg-gray-200 text-white text-center">
                        <h2 class="bg-gray-500 text-lg w-full p-2">Supported Boards</h2>
                            <ul class="text-left text-black space-y-4 mt-2 ml-2 mb-2">
                               <li><a href="#" class="hover:underline hover:text-blue-500 hover:border-b-2 border-transparent">Raspberry Pi Pico 2040</a></li>
                               <li><a href="#" class="hover:underline hover:text-blue-500 hover:border-b-2 border-transparent">MicroMod-ESP32</a></li>
                                //TODO: make more pages and route them
                            </ul>
                    </div>
                    <div class="bg-gray-200 text-white text-center">
                        <h2 class="bg-gray-500 text-lg w-full p-2">Installation</h2>
                            <ul class="text-left text-black space-y-4 mt-2 ml-2 mb-2">
                                <li><a href="#" class="hover:underline hover:text-blue-500 hover:border-b-2 border-transparent">Windows 64-bit</a></li>
                                <li><a href="#" class="hover:underline hover:text-blue-500 hover:border-b-2 border-transparent">Mac/OSX</a></li>
                                <li><a href="#" class="hover:underline hover:text-blue-500 hover:border-b-2 border-transparent">Linux</a></li>
                                //TODO: make more pages and route them

                            </ul>
                    </div>
                </div>


                
            </body>
        </html>

        



        
    }
}

/// 404 - Not Found
#[component]
fn NotFound() -> impl IntoView {
    // set an HTTP status code 404
    // this is feature gated because it can only be done during
    // initial server-side rendering
    // if you navigate to the 404 page subsequently, the status
    // code will not be set because there is not a new HTTP request
    // to the server

    view! {    
        <Title text="Iron Coder Documentation"/>
        <html>
            <head>
               
        
            </head>
            <body class="h-screen bg-gray-100 flex items-center justify-center">
            <div class="m-auto text-center"> 
                <h1 class="text-6xl text-red-500 font-bold mb-4">404</h1>
            <p class="text-gray-800 text-xl">This page is coming soon or may not exist.</p>
                <p class="text-gray-600 mt-2">Come back later!</p>
                <a href="/" class="text-blue-500 hover:underline mt-4 inline-block">Go back to the home page</a>
            </div>
        </body>
        </html>
    }
}

fn Sidebar() -> impl IntoView{
    view! {
        <div class="float-left h-screen bg-red-500 text-white px-16 py-4">
            <h2 class="text-2xl font-bold mb-4">Steps</h2>
            <ul>
                <li><a href="/project_tutorial/step1" class="hover:underline text-white-500">1. Creating a Project</a></li>
                <li><a href="/project_tutorial/step2" class="hover:underline text-white-500">2. Adding and Connecting Boards</a></li>
                <li><a href="/project_tutorial/step3" class="hover:underline text-white-500">3. Developing Software and Flashing Boards</a></li>    
            </ul>


            <p class="mt-80"><a href="/" class="hover:underline text-white-500">Back to Home</a></p>
        </div>

        
    }
}




#[component]
fn ptStep1() -> impl IntoView {
    view! {
        <Title text="Iron Coder Documentation"/>
        <html>
            <head>
            </head>
    
            <body class="font-sans bg-gray-100 w-screen h-screen flex">
                //Sidebar
                <Sidebar/>
                


                //Content
                <div class="float-right px-16 py-4">
                    <h2 class="text-2xl font-bold mb-4">Creating a Project</h2>

                    <div class = "float-left">
                        <p>The very first step to get developing in Iron Coder is making a project.</p>
                        <p>Every project needs a name and at least one main board.</p>
                        <p>For this example, we will be creating a project <q>my_project</q> and using the</p>
                        <p>RP2040 as our main board. </p>
                        <p>For now, simply name the project, and then click <q>start_development</q></p>
                    
                        <img src="/assets/tutorial/step1.png" alt = "Main project creation menu of Iron Coder" class="my-5 h-auto max-w-full rounded-lg" width=500 height=500/>

                        <p> If this is your first project, you will be asked to choose a directory to save</p>
                        <p> projects to. Afterwards, your project is ready! </p>
                    </div>

                    <div class = "float-right px-16">
                        <p> If you have already created a project, you may open it from this menu as well: </p>
                        <img src="/assets/tutorial/step1_2.png" alt = "How to open projects from Iron Coder" class="my-5 h-auto max-w-full rounded-lg" width=500 height=500/>
                    </div>

                </div>
                
            </body>
        </html>
    
        }
}

#[component]
fn ptStep2() -> impl IntoView {
    view! {
    <Title text="Iron Coder Documentation"/>
        <html>
            <head>
            </head>
    
            <body class="font-sans bg-gray-100 w-screen h-screen flex">
                //Sidebar
                <Sidebar/>
                


                //Content
                <div class="float-right px-16 py-4">
                    <h2 class="text-2xl font-bold mb-4">Adding and Connecting Boards</h2>
                    <div class = "float-left">
                        
                        <p>Now that you have made your project, it is time to specify the hardware.</p>
                        <p>Click the pencil icon at the top right to edit the boards of your project.</p>
                        <img src="/assets/tutorial/step2_1.png" class="my-5 h-auto max-w-full rounded-lg" width=500 height=500/>

                        <p> This will bring you to the following menu, in which you can place your </p>
                        <p> boards. Simply click the <q>add board</q> button, and choose a main board. </p>

                        <img src="/assets/tutorial/step2_2.png" class="my-5 h-auto max-w-full rounded-lg" width=500 height=500/>
                    </div>
                    <div class = "float-right px-16">
                        <p> If you choose to add auxillary boards, they can be connected by hovering over</p>
                        <p> pins until they turn green, and then connecting them to other available pins </p>
                        <p> Not all pins may be available. This is an example of a valid connection: </p>

                        <img src="/assets/tutorial/step2_3.png" class="my-5 h-auto max-w-full rounded-lg" width=500 height=500/>

                        <p> Click <q>start development</q> to resume. Iron Coder also allows you to do this during project creation! </p>
                        <p> Additionally, Iron Coder has project settings so that you may customize your environment: </p>

                        <img src="/assets/tutorial/step2custom.png" class="my-5 h-auto max-w-full rounded-lg" width=500 height=500/>

                    </div>

                </div>
            </body>
        </html>
    }

}

#[component]
fn ptStep3() -> impl IntoView {
    view! {
        <Title text="Iron Coder Documentation"/>
        <html>
            <head>
            </head>
    
            <body class="font-sans bg-gray-100 w-screen h-screen flex">
                //Sidebar
                <Sidebar/>
                


                //Content
                <div class="float-right px-16 py-4">
                    <h2 class="text-2xl font-bold mb-4">Developing</h2>
                    <div class = "float-left">
                    
                    <p> With the project fully initialized, you are free to start coding!</p>
                    <p> You may add files to the project yourself, or click <q>Gen Template</q></p>
                    <img src="/assets/tutorial/step3_1.png" class="my-5 h-auto max-w-full rounded-lg" width=500 height=500/>

                    <p> Clicking <q>Gen Template</q> will create a file <q>main.rs</q> that will serve as an </p>
                    <p> entry point for development. To access it, and any other files, switch to </p>
                    <p> the <q>File Explorer</q> tab. Iron Coder will display useful information for </p>
                    <p class="mb-4"> your board, including  any available crates!</p>
                    
                    <p> Once you are satisfied with your changes, press <q>build project</q> to compile</p>
                    <p> and <q>load onto board</q> to flash your changes to your board of choice. </p>

                    <img src="/assets/tutorial/step3_2.png" class="my-5 h-auto max-w-full rounded-lg" width=500 height=500/>

                    
                    </div>
                    <div class = "float-right px-16">

                    <p> That concludes this tutorial, and we hope you enjoy Iron Coder!</p>
                  

                    </div>

                </div>
            </body>
        </html>
        
    }

}