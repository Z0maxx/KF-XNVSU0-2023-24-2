<template>
    <div>
        <div v-show="isLoading">
            <h1 class="text-3xl sm:text-5xl font-medium text-transparent">_</h1>
            <div class="my-4 bg-neutral-700 border-emerald-800 border-4 rounded-lg overflow-hidden">
                <div class="p-2 bg-emerald-700 animate-pulse">
                    <div class="size-6 rounded-full bg-emerald-400"></div>
                    <div class="text-emerald-700">
                        <div>_</div>
                        <div class="flex">
                            <svg v-for="_ in 5" :key="_" xmlns="http://www.w3.org/2000/svg" stroke="black" fill="gray" viewBox="0 0 24 24" stroke-width="1" class="size-8">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                            </svg>
                        </div>
                        <div>_</div>
                        <div class="flex">
                            <svg v-for="_ in 5" :key="_" xmlns="http://www.w3.org/2000/svg" stroke="black" fill="gray" viewBox="0 0 24 24" stroke-width="1" class="size-8">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div class="p-2 bg-emerald-600 text-transparent animate-pulse">
                    <p v-for="_ in 3" :key="_">_</p>
                </div>
                <div class="p-2 font-medium bg-emerald-500 flex flex-col sm:flex-row justify-between sm:items-center gap-2 animate-pulse">
                    <div class="text-transparent">_</div>
                    <div class="px-2 py-1 flex flex-col flex-wrap sm:flex-row gap-2 bg-teal-200 text-transparent rounded-md size-max">
                        <div class="flex gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6 fill-teal-800">
                                <path d="M12 .75a8.25 8.25 0 0 0-4.135 15.39c.686.398 1.115 1.008 1.134 1.623a.75.75 0 0 0 .577.706c.352.083.71.148 1.074.195.323.041.6-.218.6-.544v-4.661a6.714 6.714 0 0 1-.937-.171.75.75 0 1 1 .374-1.453 5.261 5.261 0 0 0 2.626 0 .75.75 0 1 1 .374 1.452 6.712 6.712 0 0 1-.937.172v4.66c0 .327.277.586.6.545.364-.047.722-.112 1.074-.195a.75.75 0 0 0 .577-.706c.02-.615.448-1.225 1.134-1.623A8.25 8.25 0 0 0 12 .75Z" />
                                <path fill-rule="evenodd" d="M9.013 19.9a.75.75 0 0 1 .877-.597 11.319 11.319 0 0 0 4.22 0 .75.75 0 1 1 .28 1.473 12.819 12.819 0 0 1-4.78 0 .75.75 0 0 1-.597-.876ZM9.754 22.344a.75.75 0 0 1 .824-.668 13.682 13.682 0 0 0 2.844 0 .75.75 0 1 1 .156 1.492 15.156 15.156 0 0 1-3.156 0 .75.75 0 0 1-.668-.824Z" clip-rule="evenodd" />
                            </svg>
                            <span>_________________</span>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="currentUser" class="mt-2 p-1 flex flex-col sm:flex-row gap-1 bg-green-200 rounded animate-pulse">
                <div class="bg-green-700 p-2 border-2 border-green-800 rounded">
                    <h2 class="text-xl text-transparent">_</h2>
                    <div class="mt-1 text-transparent">_</div>
                    <div class="flex">
                        <svg v-for="_ in 5" :key="_" xmlns="http://www.w3.org/2000/svg" stroke="black" fill="gray" viewBox="0 0 24 24" stroke-width="1" class="size-8">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                        </svg>
                    </div>
                    <div class="text-transparent">_</div>
                    <div class="flex">
                        <svg v-for="_ in 5" :key="_" xmlns="http://www.w3.org/2000/svg" stroke="black" fill="gray" viewBox="0 0 24 24" stroke-width="1" class="size-8">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                        </svg>
                    </div>
                    <button class="p-2 mt-1 w-full flex gap-1 justify-center bg-lime-600 border-2 border-lime-800 font-medium rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                            <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
                        </svg>
                        <span class="text-transparent">Submit Rating</span>
                    </button>
                </div>
                <div class="relative p-2 bg-green-700 border-green-800 border-2 rounded w-full">
                    <h2 class="text-xl text-green-600">_</h2>
                    <textarea disabled rows="4" class="w-full mt-1 p-1 bg-emerald-600 border-2 border-emerald-800 rounded"></textarea>
                    <button class="p-2 mt-1 w-full flex gap-1 justify-center bg-lime-600 border-2 border-lime-800 font-medium rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                            <path fill-rule="evenodd" d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97ZM6.75 8.25a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H7.5Z" clip-rule="evenodd" />
                        </svg>
                        <span class="text-transparent">Submit Comment</span>
                    </button>
                </div>
            </div>
            <div class="mt-2 bg-neutral-800">
                <ul class="flex flex-col sm:flex-row gap-2 bg-green-200 font-medium rounded-t p-1 animate-pulse">
                    <li class="w-full sm:size-min">
                        <div class="w-full flex gap-1 p-1 border-b-2 border-slate-500 text-slate-500">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                <path fill-rule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z" clip-rule="evenodd" />
                            </svg>
                            <span class="text-transparent">Ratings</span>
                        </div>
                    </li>
                    <li class="w-full sm:size-min">
                        <div class="w-full flex gap-1 p-1 border-b-2 border-slate-500 text-slate-500">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 21v-4.03a48.527 48.527 0 0 1-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979Z" />
                                <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z" />
                            </svg>
                            <span class="text-transparent">Comments</span>
                        </div>
                    </li>
                </ul>
                <div class="bg-green-200 p-1 rounded-b animate-pulse"></div>
            </div>
        </div>
        <div>
            <h1 class="text-3xl sm:text-5xl font-medium">{{ idea?.title }}</h1>
            <Idea v-if="idea" :idea="idea" :display-owner="true" :display-title="false" :display-details="false" :display-ideas-by="true" @try-delete="setDeleted(true)" @delete-failed="setDeleted(false)"/>
            <div v-if="currentUser && userRating && userComment && currentUser.id !== idea?.ownerId" class="mt-2 p-1 flex flex-col sm:flex-row gap-1 bg-green-200 rounded">
                <div class="bg-green-700 p-2 border-2 border-green-800 rounded">
                    <div class="flex justify-between flex-wrap gap-2">
                        <h2 class="text-xl">Rating</h2>
                        <button v-if="hasRating" @click="tryDeleteUserRating" class="p-1 flex gap-1 justify-center items-center bg-lime-200 rounded-full text-red-600 hover:text-red-700 font-medium">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5">
                                <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    <div class="mt-1">Idea</div>
                    <div class="flex">
                        <svg v-for="i in 5" :key="i" @click="changeIdeaRating(i)" xmlns="http://www.w3.org/2000/svg" stroke="black" :fill="(i <= userRating.ideaRating ? starColor(userRating.ideaRating) : 'gray')" viewBox="0 0 24 24" stroke-width="1" class="size-8">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                        </svg>
                    </div>
                    <div>Price</div>
                    <div class="flex">
                        <svg v-for="i in 5" :key="i" @click="changePriceRating(i)" xmlns="http://www.w3.org/2000/svg" stroke="black" :fill="(i <= userRating.priceRating ? starColor(userRating.priceRating) : 'gray')" viewBox="0 0 24 24" stroke-width="1" class="size-8">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                        </svg>
                    </div>
                    <button @click="trySubmitRating" class="p-2 mt-1 w-full flex gap-1 justify-center bg-lime-600 hover:bg-lime-700 border-2 border-lime-800 font-medium rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                            <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
                        </svg>
                        <span>{{ hasRating ? 'Edit' : 'Submit' }} Rating</span>
                    </button>
                </div>
                <div class="relative p-2 bg-green-700 border-green-800 border-2 rounded w-full">
                    <div class="flex justify-between gap-2 flex-wrap">
                        <h2 class="text-xl">Comment</h2>
                        <button v-if="hasComment" @click="tryDeleteUserComment" class="p-1 flex gap-1 justify-center items-center bg-lime-200 rounded-full text-red-600 hover:text-red-700 font-medium">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
                                <path fill-rule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    <textarea v-model="userComment.message" rows="4" class="w-full mt-1 p-1 bg-emerald-600 border-2 border-emerald-800 rounded focus:outline-blue-500"></textarea>
                    <div class="text-cyan-400 text-xl absolute right-4 top-10">*</div>
                    <div v-for="error in commentErrors" :key="error">
                        <p class="text-cyan-400">{{ error }}</p>
                    </div>
                    <button @click="trySubmitComment" class="p-2 mt-1 w-full flex gap-1 justify-center bg-lime-600 hover:bg-lime-700 border-2 border-lime-800 font-medium rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                            <path fill-rule="evenodd" d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97ZM6.75 8.25a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H7.5Z" clip-rule="evenodd" />
                        </svg>
                        <span>{{ hasComment ? 'Edit' : 'Submit' }} Comment</span>
                    </button>
                </div>
            </div>
            <div v-show="!isLoading" class="mt-2">
                <ul class="flex flex-col sm:flex-row gap-2 bg-green-200 font-medium rounded-t p-2">
                    <li class="w-full sm:size-min">
                        <button @click="setActiveTab(0)" class="w-full flex gap-1 p-1 border-b-2" :class="{ 'border-green-800 text-green-800': activeTab === 0, 'border-slate-500 text-slate-500 hover:border-slate-600 hover:text-slate-600': activeTab !== 0 }">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                <path fill-rule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z" clip-rule="evenodd" />
                            </svg>
                            <span>Ratings</span>
                        </button>
                    </li>
                    <li class="w-full sm:size-min">
                        <button @click="setActiveTab(1)" class="p-1 w-full flex gap-1 border-b-2" :class="{ 'border-green-800 text-green-800': activeTab === 1, 'border-slate-500 text-slate-500 hover:border-slate-600 hover:text-slate-600': activeTab !== 1 }">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 21v-4.03a48.527 48.527 0 0 1-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979Z" />
                                <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z" />
                            </svg>
                            <span>Comments</span>
                        </button>
                    </li>
                </ul>
                <div class="flex flex-wrap gap-1 bg-green-200 p-1 text-white rounded-b">
                    <div v-show="activeTab === 0" class="flex flex-wrap sm:flex-nowrap">
                        <div class="max-w-48 sm:max-w-none" ref="ratingsChart"></div>
                        <div class="max-w-48 sm:max-w-none" ref="ideaRatingsChart"></div>
                        <div class="max-w-48 sm:max-w-none" ref="priceRatingsChart"></div>
                    </div>
                    <div v-show="activeTab === 0" v-for="rating in idea?.ratings.filter(r => r.ownerId !== currentUser?.id)" :key="rating.id" class="bg-green-700 p-2 border-2 border-green-800 rounded size-max">
                        <div class="flex flex-col sm:flex-row gap-2 justify-between">
                            <router-link :to="'/activities/' + rating.ownerId" class="flex flex-wrap gap-2 text-yellow-400 hover:underline">
                                <div class="size-6 rounded-full overflow-hidden">
                                    <img :src="'https://localhost:7256/api/GetProfilePicture/' + rating.ownerId" class="object-fit h-full">
                                </div>
                                <span class="font-medium">{{ rating.owner.userName ?? `${rating.owner.firstName} ${rating.owner.lastName}` }}</span>
                            </router-link>
                            <button v-if="isModerator" @click="tryDeleteRating(rating)" class="p-1 flex gap-1 justify-center items-center bg-lime-200 rounded-full text-red-600 hover:text-red-700 font-medium">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5">
                                    <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        <div>Idea</div>
                        <div class="flex">
                            <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg" stroke="black" :fill="(i <= rating.ideaRating ? starColor(rating.ideaRating) : 'gray')" viewBox="0 0 24 24" stroke-width="1" class="size-8">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                            </svg>
                        </div>
                        <div>Price</div>
                        <div class="flex">
                            <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg" stroke="black" :fill="(i <= rating.priceRating ? starColor(rating.priceRating) : 'gray')" viewBox="0 0 24 24" stroke-width="1" class="size-8">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                            </svg>
                        </div>
                    </div>
                    <div v-show="activeTab === 1" v-for="comment in idea?.comments.filter(c => c.ownerId !== currentUser?.id)" :key="comment.id" class="w-full bg-green-700 p-2 border-2 border-green-800 rounded">
                        <div class="flex flex-col sm:flex-row gap-2 justify-between">
                            <router-link :to="'/activities/' + comment.ownerId" class="flex flex-wrap gap-2 text-yellow-400 hover:underline">
                                <div class="size-6 rounded-full overflow-hidden">
                                    <img :src="'https://localhost:7256/api/GetProfilePicture/' + comment.ownerId" class="object-fit h-full">
                                </div>
                                <span class="font-medium">{{ comment.owner.userName ?? `${comment.owner.firstName} ${comment.owner.lastName}` }}</span>
                            </router-link>
                            <button v-if="isModerator" @click="tryDeleteComment(comment)" class="p-1 flex gap-1 justify-center items-center bg-lime-200 rounded-full text-red-600 hover:text-red-700 font-medium">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5">
                                    <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        <p v-for="line in splitComment(comment)" :key="line">{{ line }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useD3Chart } from '@/composables/d3-chart';
import { useFetchErrorHandler } from '@/composables/fetch-error-handler';
import { useRatingStarConverter } from '@/composables/rating-star-converter';
import { useAuthStore } from '@/stores/auth';
import { useCommentStore } from '@/stores/comment';
import { useIdeaStore } from '@/stores/idea';
import { usePopupStore } from '@/stores/popup';
import { useRatingStore } from '@/stores/rating';
import { useToastStore } from '@/stores/toast';
import { ChartData, Comment, CommentLLP, FetchError, IdeaLLP, Rating } from '@/types';
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import Idea from './Idea.vue';
import { useIdeaTracker } from '@/composables/idea-tracker';
import { useRatingTracker } from '@/composables/rating-tracker';
import { useCommentTracker } from '@/composables/comment-tracker';
import { useSignalR } from '@/composables/signal-r';
import router from '@/router';

const isLoading = ref(true)
const deleted = ref(false)
const idea = ref<IdeaLLP | undefined>(undefined)
const store = useIdeaStore()
const { getIdea } = store

const route = useRoute()
const id = computed(() => {
    return route.params.id
})

const activeTab = ref(0)

const d3Chart = useD3Chart()
const { pieChart } = d3Chart
const ratingsChart = ref<HTMLElement | null>(null)
const ideaRatingsChart = ref<HTMLElement | null>(null)
const priceRatingsChart = ref<HTMLElement | null>(null)

const auth = useAuthStore()
const { currentUser, isModerator } = storeToRefs(auth)

const hasRating = ref(false)
const userRating = ref<Rating | undefined>(undefined)
const ratingStore = useRatingStore()
const { submitRating, deleteRating } = ratingStore

const converter = useRatingStarConverter()
const { starColor } = converter

const hasComment = ref(false)
const userComment = ref<Comment | undefined>(undefined)
const commentErrors = ref<Array<string>>([])
const commentStore = useCommentStore()
const { submitComment, deleteComment, setCommentValidations } = commentStore

const popup = usePopupStore()
const { askConfirmation } = popup

const toast = useToastStore()
const { showAlert, showSuccess } = toast

const errorHandler = useFetchErrorHandler()
const { handleFetchError, handleFormFetchError } = errorHandler

const ideaTracker = useIdeaTracker()
const { trackIdeaLLP } = ideaTracker

const ratingTracker = useRatingTracker()
const { trackRating } = ratingTracker

const commentTracker = useCommentTracker()
const { trackComment } = commentTracker

const signalr = useSignalR()
const { models, onDeleted } = signalr

async function tryDeleteUserRating() {
    const rating = userRating.value
    if (!rating) return

    if (await askConfirmation('Delete Rating', 'Are you sure you want to delete this Rating?')) {
        deleteRating(rating).then(() => {
            showSuccess('Deleted Rating successfully')
        }).catch(handleFetchError)
    }
}

async function tryDeleteUserComment() {
    const comment = userComment.value
    if (!comment) return

    if (await askConfirmation('Delete Comment', 'Are you sure you want to delete this Comment?')) {
        deleteComment(comment).then(() => {
            showSuccess('Deleted Comment successfully')
        }).catch(handleFetchError)
    }
}

async function tryDeleteRating(rating: Rating) {
    if (await askConfirmation('Delete Rating', 'Are you sure you want to delete this Rating?')) {
        deleteRating(rating).then(() => {
            showSuccess('Deleted Rating successfully')
        }).catch(handleFetchError)
    }
}

async function tryDeleteComment(comment: Comment) {
    if (await askConfirmation('Delete Comment', 'Are you sure you want to delete this Comment?')) {
        deleteComment(comment).then(() => {
            showSuccess('Deleted Comment successfully')
        }).catch(handleFetchError)
    }
}

function changeIdeaRating(rating: number) {
    if (!userRating.value) return

    userRating.value.ideaRating = rating
}

function changePriceRating(rating: number) {
    if (!userRating.value) return

    userRating.value.priceRating = rating
}

function trySubmitRating() {
    if (!userRating.value) return

    submitRating(userRating.value).catch(handleFetchError)
}

function trySubmitComment() {
    if (!userComment.value) return

    submitComment(userComment.value).catch((err: FetchError) => {
        handleFormFetchError(err, { Message: commentErrors })
    })
}

function setActiveTab(tab: number) {
    activeTab.value = tab
}

function splitComment(comment: CommentLLP) {
    return comment.message.split('\n')
}

function getChartData(ratings: Array<number>): Array<ChartData> {
    return ratings.map((d, i) => ({ name: i + 1, value: d })).filter(d => d.value > 0)
}

function resetCharts() {
    if (ideaRatingsChart.value && priceRatingsChart.value && ratingsChart.value) {
        ideaRatingsChart.value.innerHTML = ''
        priceRatingsChart.value.innerHTML = ''
        ratingsChart.value.innerHTML = ''
    }
}

function displayCharts() {
    resetCharts()
    if (!idea.value?.ratings.length) return

    const ideaRatings = [0, 0, 0, 0, 0]
    const priceRatings = [0, 0, 0, 0, 0]
    const ratings = [0, 0, 0, 0, 0]
    idea.value?.ratings.forEach(r => {
        ideaRatings[r.ideaRating - 1]++
        priceRatings[r.priceRating - 1]++
        ratings[r.priceRating - 1]++
        ratings[r.ideaRating - 1]++
    })

    pieChart(getChartData(ideaRatings), ideaRatingsChart.value, 'Idea Ratings')
    pieChart(getChartData(priceRatings), priceRatingsChart.value, 'Idea Ratings')
    pieChart(getChartData(ratings), ratingsChart.value, 'Overall Ratings')
}

function setDefaultValues() {
    const user = currentUser.value
    const instance = idea.value
    if (!user || !instance) return

    const ownerId = user.id
    const ideaId = instance.id

    userRating.value = instance.ratings.find(r => r.ownerId === ownerId)
    if (!userRating.value) {
        userRating.value = {
            id: '',
            ownerId,
            ideaId,
            priceRating: 5,
            ideaRating: 5
        }
    }
    else {
        hasRating.value = true
    }
    trackRating(userRating, hasRating)

    userComment.value = instance.comments.find(c => c.ownerId === ownerId)
    if (!userComment.value) {
        userComment.value = {
            id: '',
            ownerId,
            ideaId,
            message: ''
        }
    }
    else {
        hasComment.value = true
    }
    trackComment(userComment, hasComment)
}

function fetchData() {
    if (typeof id.value !== 'string') return

    getIdea(id.value).then((res) => {
        isLoading.value = false
        idea.value = res
        trackIdeaLLP(idea)
        displayCharts()
        if (currentUser.value) {
            setDefaultValues()
            setCommentValidations()
        }
    }).catch(handleFetchError)
}

function ideaDeleted(id: string) {
    if (idea.value?.id == id) {
        if (!deleted.value) {
            showAlert('Idea got deleted')
        }
        router.push({ path: '/ideas' })
    }
}

function setDeleted(value: boolean) {
    deleted.value = value
}

onMounted(() => {
    onDeleted(ideaDeleted, models.idea)
    fetchData()
})

watch(id, () => {
    fetchData()
})

watch(idea, () => {
    displayCharts()
})
</script>