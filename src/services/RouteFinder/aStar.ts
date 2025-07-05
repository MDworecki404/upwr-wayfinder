import bikeFootGraph from './data/bikeFootGraph.json'
import carGraph from './data/carGraph.json'

// Definicja typów dla grafów


// Funkcja budująca graf na podstawie danych GeoJSON
export const buildGraph = (mode: string) => {
    let graph

    if (mode === "foot" || mode === "bike") {
        graph = bikeFootGraph as any;
    } else if (mode === "car") {
        graph = carGraph as any;
    } else {
        throw new Error(`Nieznany tryb: ${mode}`);
    }

    // Zamiana edges z obiektu na Mapę
    const edgesMap = new Map<string, number[]>();
    for (const key in graph.edges) {
        edgesMap.set(key, graph.edges[key]);
    }

    // nodes są już w postaci tablicy, więc bez zmian
    return {
        nodes: graph.nodes,
        edges: edgesMap,
    };
};

// Heurystyka dla algorytmu A* (oblicza odległość euklidesową między dwoma punktami)
const heuristic = (a: number[], b: number[]) => {
    return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));
};

export const aStar = (start: number[], goal: number[], graph: { nodes: number[][], edges: Map<string, number[]> }) => {
    const { nodes, edges } = graph; // Pobranie węzłów i krawędzi z grafu
    console.log(graph)
    const startKey = JSON.stringify(start); // Konwersja punktu początkowego na string (dla Map)
    const goalKey = JSON.stringify(goal); // Konwersja punktu docelowego na string (dla Map)

    let openSet = new Set([startKey]); // Zbiór węzłów do odwiedzenia (zaczynamy od startowego)
    let cameFrom = new Map<string, string>(); // Mapa śledząca, skąd przyszliśmy do danego węzła
    let gScore = new Map<string, number>(nodes.map(node => [JSON.stringify(node), Infinity])); // Koszt dojścia do każdego węzła (Infinity na start)
    let fScore = new Map<string, number>(nodes.map(node => [JSON.stringify(node), Infinity])); // Szacowany koszt do celu (Infinity na start)

    gScore.set(startKey, 0); // Koszt dojścia do punktu startowego wynosi 0
    fScore.set(startKey, heuristic(start, goal)); // Szacowany koszt od startu do celu

    while (openSet.size > 0) { // Dopóki są węzły do odwiedzenia
        let current = [...openSet].reduce((a, b) => {
            const scoreA = fScore.get(a) ?? Infinity;
            const scoreB = fScore.get(b) ?? Infinity;
            return scoreA < scoreB ? a : b;
        }); // Znalezienie węzła o najniższym fScore
        
        if (current === goalKey) { // Jeśli osiągnęliśmy cel, odtwarzamy ścieżkę
            let path: number[][] = [];
            while (cameFrom.has(current)) {
                path.push(JSON.parse(current)); // Dodajemy aktualny węzeł do ścieżki
                current = cameFrom.get(current)!; // Przechodzimy do poprzedniego węzła
            }
            path.push(start); // Dodajemy punkt startowy na początek ścieżki
            return path.reverse(); // Odwracamy, aby uzyskać poprawną kolejność od startu do celu
        }

        openSet.delete(current); // Usuwamy aktualny węzeł z listy do odwiedzenia
        let neighbors = edges.get(current) || []; // Pobranie sąsiadów bieżącego węzła

        for (let neighbor of neighbors) { // Iterowanie przez sąsiadów
            let neighborKey = JSON.stringify(neighbor);
            const currentGScore = gScore.get(current) ?? Infinity;
            let tentativeGScore = currentGScore + heuristic(JSON.parse(current), neighbor as any); // Obliczenie nowego kosztu dojścia
            const neighborGScore = gScore.get(neighborKey) ?? Infinity;

            if (tentativeGScore < neighborGScore) { // Jeśli znaleźliśmy krótszą drogę
                cameFrom.set(neighborKey, current); // Zapisujemy skąd przyszliśmy
                gScore.set(neighborKey, tentativeGScore); // Aktualizujemy koszt dojścia
                fScore.set(neighborKey, tentativeGScore + heuristic(neighbor as any, goal)); // Aktualizujemy całkowity szacowany koszt
                openSet.add(neighborKey); // Dodajemy sąsiada do zbioru do odwiedzenia
            }
        }
    }
    
    return []; // Jeśli nie znaleziono ścieżki, zwracamy pustą tablicę
    
};