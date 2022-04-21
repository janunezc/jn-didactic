(()=>{

  function bellmanFord(edges, nodeCount, firsNodeIndex) {
    const minDistances = new Array(nodeCount).fill(Infinity);
    console.log(distances);

    for(let i=0; i<nodeCount-1; n++){
      let changesCount = 0;
      for (let j=0; j<edges.length; j++){
        const sourceNode = edges[j][0];
        const targetNode = edges[j][1];
        const weight = edges[j][2];

        if(minDistances[source] + weight < minDistances[targetNode]){
          minDistances[targetNode] = minDistances[sourceNode] + weight;
          changesCount++;
        }


      }
      if(changesCount===0) break;
    }

    const answer = Math.max(...minDistances);

    return answer === Infinity ? -1 : answer;

  }
})();
