<template>
    <div>
        <div v-show="isLoading">
            <h1 class="text-3xl sm:text-5xl font-medium text-transparent">_</h1>
            <div class="mt-4 bg-neutral-800">
                <ul class="flex flex-col sm:flex-row gap-2 bg-green-200 font-medium rounded-t p-1 animate-pulse">
                    <li class="w-full sm:size-min">
                        <div class="w-full flex gap-1 p-1 border-b-2 border-slate-500 text-slate-500">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                <path d="M5.566 4.657A4.505 4.505 0 0 1 6.75 4.5h10.5c.41 0 .806.055 1.183.157A3 3 0 0 0 15.75 3h-7.5a3 3 0 0 0-2.684 1.657ZM2.25 12a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3v-6ZM5.25 7.5c-.41 0-.806.055-1.184.157A3 3 0 0 1 6.75 6h10.5a3 3 0 0 1 2.683 1.657A4.505 4.505 0 0 0 18.75 7.5H5.25Z" />
                            </svg>
                            <span class="text-transparent">Ideas</span>
                        </div>
                    </li>
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
        <h1 v-if="user" class="flex gap-2 flex-wrap text-3xl sm:text-5xl font-medium">
            <span>Activities By</span>
            <div class="size-12 rounded-full overflow-hidden">
                <img :src="'https://localhost:7256/api/GetProfilePicture/' + user.id" class="object-fit h-full">
            </div>
            <span>{{ user.userName ?? `${user.firstName} ${user.lastName}` }}</span>
        </h1>
        <div v-show="user">
            <div class="mt-4">
                <ul class="flex flex-col sm:flex-row gap-2 bg-green-200 font-medium rounded-t p-1">
                    <li class="w-full sm:size-min">
                        <button @click="setActiveTab(0)" class="w-full flex gap-1 p-1 border-b-2" :class="{ 'border-green-800 text-green-800': activeTab === 0, 'border-slate-500 text-slate-500 hover:border-slate-600 hover:text-slate-600': activeTab !== 0 }">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                <path d="M5.566 4.657A4.505 4.505 0 0 1 6.75 4.5h10.5c.41 0 .806.055 1.183.157A3 3 0 0 0 15.75 3h-7.5a3 3 0 0 0-2.684 1.657ZM2.25 12a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3v-6ZM5.25 7.5c-.41 0-.806.055-1.184.157A3 3 0 0 1 6.75 6h10.5a3 3 0 0 1 2.683 1.657A4.505 4.505 0 0 0 18.75 7.5H5.25Z" />
                            </svg>
                            <span>Ideas</span>
                        </button>
                    </li>
                    <li class="w-full sm:size-min">
                        <button @click="setActiveTab(1)" class="w-full flex gap-1 p-1 border-b-2" :class="{ 'border-green-800 text-green-800': activeTab === 1, 'border-slate-500 text-slate-500 hover:border-slate-600 hover:text-slate-600': activeTab !== 1 }">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                <path fill-rule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z" clip-rule="evenodd" />
                            </svg>
                            <span>Ratings</span>
                        </button>
                    </li>
                    <li class="w-full sm:size-min">
                        <button @click="setActiveTab(2)" class="p-1 w-full flex gap-1 border-b-2" :class="{ 'border-green-800 text-green-800': activeTab === 2, 'border-slate-500 text-slate-500 hover:border-slate-600 hover:text-slate-600': activeTab !== 2 }">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 21v-4.03a48.527 48.527 0 0 1-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979Z" />
                                <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z" />
                            </svg>
                            <span>Comments</span>
                        </button>
                    </li>
                </ul>
            </div>
            <div class="flex flex-wrap gap-1 bg-green-200 p-1 text-white rounded-b">
                <div v-show="activeTab === 0" v-for="(idea, index) in user?.ideas" :key="idea.id" class="w-full bg-emerald-700 p-2 border-2 border-emerald-800 rounded">
                    <div class="flex flex-col sm:flex-row gap-2 justify-between">
                        <h2 class="text-xl font-bold">{{ idea.title }}</h2>
                        <div v-if="currentUser && (currentUser.id === idea.ownerId || isModerator)" class="size-6 relative">
                            <button @click="toggleMenu(index)" class="rounded-full bg-lime-200 hover:bg-lime-300 size-6">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-lime-800">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                                </svg>
                            </button>
                            <div v-show="showMenu[index]" class="p-1 bg-lime-200 absolute rounded-md top-6 sm:right-0 font-medium">
                                <router-link :to="'/edit-idea/' + idea.id" v-if="currentUser.id === idea.ownerId" class="flex gap-1 mb-2 text-blue-600 hover:underline">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                        <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                                    </svg>
                                    <span>Edit</span>
                                </router-link>
                                <button @click="tryDeleteIdea(idea)" class="flex gap-1 text-red-600 hover:text-red-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                        <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                                    </svg>
                                    <span>Delete</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>Ratings: {{ idea.ratingCount }}</div>
                        <div>Comments: {{ idea.commentCount }}</div>
                    </div>
                    <div class="mt-2 p-1 bg-teal-200 text-teal-800 rounded-md size-max font-medium">
                        <router-link :to="'/idea/' + idea.id" class="flex gap-1 hover:underline">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                <path d="M5.625 3.75a2.625 2.625 0 1 0 0 5.25h12.75a2.625 2.625 0 0 0 0-5.25H5.625ZM3.75 11.25a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75ZM3 15.75a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75ZM3.75 18.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75Z" />
                            </svg>
                            <span>Details</span>
                        </router-link>
                    </div>
                </div>
                <div v-show="activeTab === 1" v-for="rating in user?.ratings" :key="rating.id" class="w-full bg-emerald-700 p-2 border-2 border-emerald-800 rounded">
                    <div class="flex flex-col sm:flex-row gap-2 justify-between">
                        <h2 class="text-xl font-bold">{{ rating.ideaTitle }}</h2>
                        <div class="flex flex-col sm:flex-row gap-2 justify-between">
                            <button v-if="currentUser && (currentUser.id === rating.ownerId || isModerator)" @click="tryDeleteRating(rating)" class="p-1 flex gap-1 justify-center items-center bg-lime-200 rounded-full text-red-600 hover:text-red-700 font-medium">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5">
                                    <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        </div>
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
                    <div class="mt-2 p-1 bg-teal-200 text-teal-800 rounded-md size-max font-medium">
                        <router-link :to="'/idea/' + rating.ideaId" class="flex gap-1 hover:underline">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                <path d="M12 .75a8.25 8.25 0 0 0-4.135 15.39c.686.398 1.115 1.008 1.134 1.623a.75.75 0 0 0 .577.706c.352.083.71.148 1.074.195.323.041.6-.218.6-.544v-4.661a6.714 6.714 0 0 1-.937-.171.75.75 0 1 1 .374-1.453 5.261 5.261 0 0 0 2.626 0 .75.75 0 1 1 .374 1.452 6.712 6.712 0 0 1-.937.172v4.66c0 .327.277.586.6.545.364-.047.722-.112 1.074-.195a.75.75 0 0 0 .577-.706c.02-.615.448-1.225 1.134-1.623A8.25 8.25 0 0 0 12 .75Z" />
                                <path fill-rule="evenodd" d="M9.013 19.9a.75.75 0 0 1 .877-.597 11.319 11.319 0 0 0 4.22 0 .75.75 0 1 1 .28 1.473 12.819 12.819 0 0 1-4.78 0 .75.75 0 0 1-.597-.876ZM9.754 22.344a.75.75 0 0 1 .824-.668 13.682 13.682 0 0 0 2.844 0 .75.75 0 1 1 .156 1.492 15.156 15.156 0 0 1-3.156 0 .75.75 0 0 1-.668-.824Z" clip-rule="evenodd" />
                            </svg>
                            <span>Idea</span>
                        </router-link>
                    </div>
                </div>
                <div v-show="activeTab === 2" v-for="comment in user?.comments" :key="comment.id" class="w-full bg-emerald-700 p-2 border-2 border-emerald-800 rounded">
                    <div class="flex flex-col sm:flex-row gap-2 justify-between">
                        <h2 class="text-xl font-bold">{{ comment.ideaTitle }}</h2>
                        <div class="flex flex-col sm:flex-row gap-2 justify-between">
                            <button v-if="currentUser && (currentUser.id === comment.ownerId || isModerator)" @click="tryDeleteComment(comment)" class="p-1 flex gap-1 justify-center items-center bg-lime-200 rounded-full text-red-600 hover:text-red-700 font-medium">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5">
                                    <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <p v-for="line in splitComment(comment)" :key="line">{{ line }}</p>
                    <div class="mt-2 p-1 bg-teal-200 text-teal-800 rounded-md size-max font-medium">
                        <router-link :to="'/idea/' + comment.ideaId" class="flex gap-1 hover:underline">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                <path d="M12 .75a8.25 8.25 0 0 0-4.135 15.39c.686.398 1.115 1.008 1.134 1.623a.75.75 0 0 0 .577.706c.352.083.71.148 1.074.195.323.041.6-.218.6-.544v-4.661a6.714 6.714 0 0 1-.937-.171.75.75 0 1 1 .374-1.453 5.261 5.261 0 0 0 2.626 0 .75.75 0 1 1 .374 1.452 6.712 6.712 0 0 1-.937.172v4.66c0 .327.277.586.6.545.364-.047.722-.112 1.074-.195a.75.75 0 0 0 .577-.706c.02-.615.448-1.225 1.134-1.623A8.25 8.25 0 0 0 12 .75Z" />
                                <path fill-rule="evenodd" d="M9.013 19.9a.75.75 0 0 1 .877-.597 11.319 11.319 0 0 0 4.22 0 .75.75 0 1 1 .28 1.473 12.819 12.819 0 0 1-4.78 0 .75.75 0 0 1-.597-.876ZM9.754 22.344a.75.75 0 0 1 .824-.668 13.682 13.682 0 0 0 2.844 0 .75.75 0 1 1 .156 1.492 15.156 15.156 0 0 1-3.156 0 .75.75 0 0 1-.668-.824Z" clip-rule="evenodd" />
                            </svg>
                            <span>Idea</span>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useFetchErrorHandler } from '@/composables/fetch-error-handler';
import { useRatingStarConverter } from '@/composables/rating-star-converter';
import { useAuthStore } from '@/stores/auth';
import { useCommentStore } from '@/stores/comment';
import { useIdeaStore } from '@/stores/idea';
import { usePopupStore } from '@/stores/popup';
import { useRatingStore } from '@/stores/rating';
import { useSiteUserStore } from '@/stores/site-user';
import { useToastStore } from '@/stores/toast';
import { Comment, Idea, Rating, SiteUserLLP } from '@/types';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const isLoading = ref(true)
const showMenu = ref<Array<boolean>>([])
const activeTab = ref(0)

const user = ref<SiteUserLLP | undefined>(undefined)
const store = useSiteUserStore()
const { getSiteUserActivities } = store

const route = useRoute()
const id = computed(() => {
    return route.params.id
})

const auth = useAuthStore()
const { currentUser, isModerator } = auth

const ideaStore = useIdeaStore()
const { deleteIdea } = ideaStore

const ratingStore = useRatingStore()
const { deleteRating } = ratingStore

const converter = useRatingStarConverter()
const { starColor } = converter

const commentStore = useCommentStore()
const { deleteComment } = commentStore

const popup = usePopupStore()
const { askConfirmation } = popup

const toast = useToastStore()
const { showSuccess } = toast

const errorHandler = useFetchErrorHandler()
const { handleFetchError } = errorHandler

function setActiveTab(tab: number) {
    activeTab.value = tab
}

function toggleMenu(i: number) {
    showMenu.value[i] = !showMenu.value[i]
}

function splitComment(comment: Comment) {
    return comment.message.split('\n')
}

async function tryDeleteIdea(idea: Idea) {
    if (await askConfirmation('Delete Idea', 'Are you sure you want to delete this Idea?')) {
        deleteIdea(idea).then(() => {
            showSuccess('Deleted Idea successfully')
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

function fetchData() {
    if (typeof id.value !== 'string') return

    getSiteUserActivities(id.value).then((res) => {
        user.value = res
        showMenu.value.fill(false, 0, res.ideas.length)
        isLoading.value = false
    }).catch(handleFetchError)
}

onMounted(() => {
    fetchData()
})

watch(id, () => {
    fetchData()
})
</script>