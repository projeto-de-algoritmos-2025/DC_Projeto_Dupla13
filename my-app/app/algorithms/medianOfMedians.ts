export default function medianOfMedians(arr: number[], k: number): number {
    let sets = setsOf5(arr);
    let pivot = medianOfEachGroup(sets);
    let extractedData = partitionData(arr, pivot);
    return conditionsFromOracle(extractedData, k, pivot, medianOfMedians)

}

// Etapa 1: Divide um vetor em subconjuntos de tamanho máximo 5
let setsOf5 = (arr: number[]): number[][] => {
    
    let group: number[][] = [];
    for (let i = 0; i < arr.length; i += 5) {
        group.push(arr.slice(i, i + 5));

    }
    return group;
}

/*  Etapa 2: Ordena cada subconjunto, extrai sua mediana e depois 
    pega a mediana desse conjunto de medianas
*/
let medianOfEachGroup = (sets: number[][]): number => {

    let middleIndex: number, medianOfMedians: number[];
    medianOfMedians = [];

    sets.map(group => {
        sortArr(group);
        middleIndex = median(group); 
        medianOfMedians.push(group[middleIndex]); 
    });
    middleIndex = median(medianOfMedians); 
    sortArr(medianOfMedians);
    return medianOfMedians[middleIndex];
}   

/*  Etapa 3: Extrai dados do vetor original, sendo eles o número 
    de elementos menores que o pivô, o número de elementos maiores 
    que o pivô e o pivô propriamente dito
*/
let partitionData = (arr: number[], medianOfMedians: number): PartitionInfo => {

    let left: number[], right: number[];
    let leftCounter: number, rightCounter: number; 
    let partitionedArr: number[];
    left = [], right = [];
    leftCounter = 0, rightCounter = 0;
    arr.forEach((element) => {
        if (element < medianOfMedians) {
            left.push(element);
            leftCounter++;
        }
        else if (element > medianOfMedians) {
            right.push(element);
            rightCounter++;
        }
    });

    partitionedArr = [...left, medianOfMedians, ...right];
    return {
        partitionedArr, 
        leftCounter, 
        rightCounter
    };

};

/*  Etapa 4: Define se o pivô é a resposta, se deve buscar 
    na esquerda ou se deve buscar na direita. Basicamente é
    a aplicação do oráculo
*/
let conditionsFromOracle = (extractedData: PartitionInfo, k: number, medianOfMedians: number, 
        medianOfMediansFn: (arr: number[], k: number) => number
    ): number => {

    let { partitionedArr, leftCounter } = extractedData;
        
    if (leftCounter === k - 1) {
        return medianOfMedians;
    }

    if (leftCounter > k - 1) {
        let leftSide = partitionedArr.slice(0, leftCounter);
        return medianOfMediansFn(leftSide, k);
    }

    let rightSide = partitionedArr.slice(leftCounter + 1);
    let newK = k - (leftCounter + 1);
    return medianOfMediansFn(rightSide, newK);
}

/* Funções de auxílio */ 

// Tipagem do particionamento do vetor modificado 
export type PartitionInfo = {
    partitionedArr: number[],
    leftCounter: number,
    rightCounter: number,
}

// Função do índice da mediana
let median = (group: number[]): number => {

    let middleIndex: number;
    middleIndex = k(group);

    return middleIndex - 1;
}

// Função que extrai a metade do tamanho do vetor
let k = (group: number[]): number => {
    if(Number.isInteger(group.length / 2))
        return group.length / 2;
    else
        return Math.ceil(group.length / 2);
}

// Função que ordena o vetor
let sortArr = (arr: number[]): void => {
    arr.sort((a, b) => a - b);
}

/*
let arr: number[] = [
    3, 2, 14, 6, 0, 16, 8, 9, 13, 12, 7, 17, 10, 1, 11, 15, 5, 18, 4, 19
]
*/
let arr: number[] = [
    7, 14, 5, 2, 12, 10
]
/*
let arr: number[] = [
    4, 8, 2, 3, 1, 5, 4, 7, 4, 7, 9, 8, 1, 3, 3, 2, 4, 1, 4, 10, 5, 1, 4, 3, 6, 6, 6, 9, 10, 4, 10, 6, 7, 9, 8
]
*/
let k2 = k(arr);
console.log(medianOfMedians(arr, k2));
