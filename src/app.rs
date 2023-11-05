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
        <Title text="Welcome to Leptos"/>

        // content for this welcome page
        <Router>
            <main>
                <Routes>
                    <Route path="" view=HomePage/>
                    <Route path="/*any" view=NotFound/>
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
            <body>
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
                            <li><a href="#" class="hover:underline hover:text-blue-500 hover:border-b-2 border-transparent">Making your First Project</a></li>
                            <li><a href="#" class="hover:underline hover:text-blue-500 hover:border-b-2 border-transparent">Adding and connecting boards</a></li>
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
    #[cfg(feature = "ssr")]
    {
        // this can be done inline because it's synchronous
        // if it were async, we'd use a server function
        let resp = expect_context::<leptos_actix::ResponseOptions>();
        resp.set_status(actix_web::http::StatusCode::NOT_FOUND);
    }

    view! {
        <h1>"Not Found"</h1>
    }
}
