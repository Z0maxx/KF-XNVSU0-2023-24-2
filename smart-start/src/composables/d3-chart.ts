import { ChartData } from "@/types"

// eslint-disable-next-line
declare const d3: any
type Data = {
    name: string
    startAngle: number
    endAngle: number
    data: ChartData
}

type Text = {
    append: (p: unknown) => typeof d3
    filter: (p: unknown) => typeof d3
}

export function useD3Chart() {
    function pieChart(data: Array<ChartData>, element: HTMLElement | null, name: string) {
        const width = 370
        const height = width
        const radius = Math.min(width, height) / 2

        const arc = d3.arc()
            .innerRadius(radius * 0.67)
            .outerRadius(radius - 1)

        const pie = d3.pie()
            .padAngle(1 / radius)
            .sort(null)
            .value((d: ChartData) => d.value)

        const colors = ['hsl(0, 0%, 30%)', 'hsl(0, 100%, 65%)', 'hsl(30, 100%, 65%)', 'hsl(60, 100%, 65%)', 'hsl(120, 100%, 65%)']
        const color = d3.scaleOrdinal(colors.filter((c, i) => data.some(d => d.name === (i + 1))))

        const svg = d3.create("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [-width / 2, -height / 2, width, height])
            .attr("style", "max-width: 100%; height: auto;")

        svg.append("g")
            .selectAll()
            .data(pie(data))
            .join("path")
            .attr("fill", (d: Data) => color(d.data.name))
            .attr("d", arc)
            .append("title")
            .text((d: Data) => `${d.data.name}: ${d.data.value.toLocaleString()}`)

        svg.append("g")
            .attr('style', 'stroke:black;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;')
            .attr("font-family", "sans-serif")
            .attr("font-size", 18)
            .attr("fill", "white")
            .attr("text-anchor", "middle")
            .selectAll()
            .data(pie(data))
            .join("text")
            .attr("transform", (d: Data) => {
                const centroid = arc.centroid(d)
                return `translate(${centroid})`
            })
            .call((text: Text) => text.append("tspan")
                .attr("y", "-0.4em")
                .attr("font-weight", "900")
                .text((d: Data) => d.data.name))
            .call((text: Text) => text.filter((d: Data) => (d.endAngle - d.startAngle) > 0.25).append("tspan")
                .attr("x", 0)
                .attr("y", "0.7em")
                .attr("font-weight", "bold")
                .text((d: Data) => d.data.value))

        svg.append('text')
            .attr("font-family", "sans-serif")
            .attr("font-size", 20)
            .attr("class", "fill-green-800")
            .attr("text-anchor", "middle")
            .call((text: Text) => text.append('tspan'))
            .attr("font-weight", 'bold')
            .text(name)

        element?.appendChild(svg.node())
    }

    return { pieChart }
}