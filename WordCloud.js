/**
 * Homework 2: Part 2
 * Create a application that will ask the user for a word and you will then generate word cloud
 */
async function fetchSynonyms() {
    const word = document.getElementById("word-input").value;
    if (!word) return;

    const apiKey = "5804152661msh066211895b18be1p143d06jsn335c8f819487";
    const url = `https://wordsapiv1.p.rapidapi.com/words/${word}/synonyms`;

    try {
        const response = await fetch(url, {
            headers: {
                "X-RapidAPI-Key": apiKey,
                "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com"
            }
        });

        const data = await response.json();
        generateWordCloud(data.synonyms || []);
    } catch (error) {
        console.error("Error fetching synonyms:", error);
    }
}

function generateWordCloud(words) {
    const width = 500, height = 300;
    
    d3.select("#word-cloud").selectAll("svg").remove();
    const svg = d3.select("#word-cloud")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    const layout = d3.layout.cloud()
        .size([width, height])
        .words(words.map(word => ({ text: word, size: Math.random() * 50 + 10 })))
        .padding(5)
        .rotate(() => (Math.random() > 0.5 ? 0 : 90))
        .fontSize(d => d.size)
        .on("end", draw);

    layout.start();

    function draw(words) {
        svg.append("g")
            .attr("transform", `translate(${width / 2}, ${height / 2})`)
            .selectAll("text")
            .data(words)
            .enter()
            .append("text")
            .style("font-size", d => `${d.size}px`)
            .attr("text-anchor", "middle")
            .attr("transform", d => `translate(${d.x},${d.y}) rotate(${d.rotate})`)
            .text(d => d.text);
    }
}

