import { buildGraph, aStar } from './aStar.ts';

onmessage = function(e) {
    const { start, goal, mode } = e.data;  

    const startTime = Date.now();
    
    console.log("👷‍♂️ Worker otrzymał dane:", { start, goal });

    const graph = buildGraph(mode);

    console.log("📈 Zbudowano graf:", graph.nodes.length, "węzłów");

    // znajdź najbliższe węzły
    const findNearestNode = (point: number[], nodes: number[][]) => {
        let nearest = null;
        let minDist = Infinity;

        nodes.forEach(node => {
            const dist = Math.sqrt(
                Math.pow(node[0] - point[0], 2) + Math.pow(node[1] - point[1], 2)
            );
            if (dist < minDist) {
                minDist = dist;
                nearest = node;
            }
        });

        return nearest;
    };

    const nearestStart: number[] | null = findNearestNode(start, graph.nodes);
    const nearestGoal: number[] | null = findNearestNode(goal, graph.nodes);

    console.log("🚩 Najbliższy węzeł start:", nearestStart);
    console.log("🏁 Najbliższy węzeł cel:", nearestGoal);

    const path = aStar(nearestStart!, nearestGoal!, graph);

    console.log("🗺️ Znaleziona ścieżka, długość:", path.length);

    postMessage({ path });
    const endTime = Date.now();
    console.log("⏱️ Czas wykonania:", endTime - startTime, "ms");
};