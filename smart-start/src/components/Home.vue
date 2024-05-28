<template>
  <div>
    <div>
      <h1 class="text-4xl md:text-6xl">Welcome</h1>
      <p class="text-xl md:text-2xl">Let people rate and comment on your ideas before spending money on your startup ideas!</p>
      <div class="mt-4 text-3xl md:text-5xl"><span class="count">{{ ideaCount }}</span> Ideas with <span class="count">{{ ratingCount }}</span> Ratings and <span class="count">{{ commentCount }}</span> Comments</div>
      <div class="mt-4 flex flex-wrap sm:flex-nowrap bg-green-200 rounded-lg p-2 bg-opacity-80">
        <div class="max-w-48 sm:max-w-none" ref="ratingsChart"></div>
        <div class="max-w-48 sm:max-w-none" ref="ideaRatingsChart"></div>
        <div class="max-w-48 sm:max-w-none" ref="priceRatingsChart"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useD3Chart } from "@/composables/d3-chart";
import { useFetchErrorHandler } from "@/composables/fetch-error-handler";
import { useIdeaTracker } from "@/composables/idea-tracker";
import { useIdeaStore } from "@/stores/idea";
import { ChartData, IdeaLLP } from "@/types";
import { onMounted, ref, watch } from "vue";

const icons = ref<HTMLDivElement | null>(null)

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const ideas = ref<Array<IdeaLLP>>([])

const ideaCount = ref('')
const ratingCount = ref('')
const commentCount = ref('')

const ideaStore = useIdeaStore()
const { getIdeas } = ideaStore

const tracker = useIdeaTracker()
const { trackIdeasLLP } = tracker

const errorHandler = useFetchErrorHandler()
const { handleFetchError } = errorHandler

const chart = useD3Chart()
const { pieChart } = chart
const ratingsChart = ref<HTMLElement | null>(null)
const ideaRatingsChart = ref<HTMLElement | null>(null)
const priceRatingsChart = ref<HTMLElement | null>(null)

function getChartData(ratings: Array<number>): Array<ChartData> {
  return ratings.map((d, i) => ({ name: i + 1, value: d })).filter(d => d.value > 0)
}

function resetCharts() {
  console.log(ideaRatingsChart, priceRatingsChart, ratingsChart)
  if (ideaRatingsChart.value && priceRatingsChart.value && ratingsChart.value) {
    ideaRatingsChart.value.innerHTML = ''
    priceRatingsChart.value.innerHTML = ''
    ratingsChart.value.innerHTML = ''
  }
}

function displayCharts() {
  resetCharts()
  const ideaRatings = [0, 0, 0, 0, 0]
  const priceRatings = [0, 0, 0, 0, 0]
  const ratings = [0, 0, 0, 0, 0]
  ideas.value?.forEach(idea => {
    idea.ratings.forEach(r => {
      ideaRatings[r.ideaRating - 1]++
      priceRatings[r.priceRating - 1]++
      ratings[r.priceRating - 1]++
      ratings[r.ideaRating - 1]++
    })
  })

  pieChart(getChartData(ideaRatings), ideaRatingsChart.value, 'Idea Ratings')
  pieChart(getChartData(priceRatings), priceRatingsChart.value, 'Idea Ratings')
  pieChart(getChartData(ratings), ratingsChart.value, 'Overall Ratings')
}

onMounted(() => {
  getIdeas().then((res) => {
    ideas.value = res
    trackIdeasLLP(ideas)
  }).catch(handleFetchError)
})

watch(ideas, (value) => {
  ideaCount.value = value.length.toString()
  ratingCount.value = value.reduce((acc, curr) => acc + curr.ratings.length, 0).toString()
  commentCount.value = value.reduce((acc, curr) => acc + curr.comments.length, 0).toString()
  displayCharts()
}, { deep: true })
</script>
<style>
:root {
  --color1: yellow;
  --color2: lightblue;
  --color3: lightcoral;
  --color4: plum;
  --blur: 10px;
  --range1: 8px;
  --range2: -8px;
}


@keyframes countshadow {
  0% {
    text-shadow:
      var(--range1) var(--range1) var(--blur) var(--color1),
      var(--range2) var(--range2) var(--blur) var(--color2),
      var(--range2) var(--range1) var(--blur) var(--color3),
      var(--range1) var(--range2) var(--blur) var(--color4)
  }

  25% {
    text-shadow:
      var(--range2) var(--range1) var(--blur) var(--color1),
      var(--range1) var(--range2) var(--blur) var(--color2),
      var(--range2) var(--range2) var(--blur) var(--color3),
      var(--range1) var(--range1) var(--blur) var(--color4)
  }

  50% {
    text-shadow:
      var(--range2) var(--range2) var(--blur) var(--color1),
      var(--range1) var(--range1) var(--blur) var(--color2),
      var(--range1) var(--range2) var(--blur) var(--color3),
      var(--range2) var(--range1) var(--blur) var(--color4)
  }

  75% {
    text-shadow:
      var(--range1) var(--range2) var(--blur) var(--color1),
      var(--range2) var(--range1) var(--blur) var(--color2),
      var(--range1) var(--range1) var(--blur) var(--color3),
      var(--range2) var(--range2) var(--blur) var(--color4)
  }

  100% {
    text-shadow:
      var(--range1) var(--range1) var(--blur) var(--color1),
      var(--range2) var(--range2) var(--blur) var(--color2),
      var(--range2) var(--range1) var(--blur) var(--color3),
      var(--range1) var(--range2) var(--blur) var(--color4)
  }
}

.count {
  color: black;
  font-weight: bold;
  animation: countshadow 5s linear infinite;
}
</style>