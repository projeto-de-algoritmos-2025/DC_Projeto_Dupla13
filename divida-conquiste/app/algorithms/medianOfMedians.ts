export type AirQualitySample = {
    timestamp: string;
    value: number;
};

export type StepLog = {
    step: string;
    data: any;
};

/*
    Função principal
*/
export default function medianOfMedians(
    arr: number[] | AirQualitySample[],
    k: number,
    trackSteps = false,
    steps: StepLog[] = []
): number {

    let numericArr = extractValues(arr);

    if (trackSteps) {
        steps.push({
            step: "Entrada da função",
            data: { arr: numericArr, k }
        });
    }

    let sets = setsOf5(numericArr);

    if (trackSteps) {
        steps.push({
            step: "Divisão em grupos de no máximo 5 elementos",
            data: sets
        });
    }

    let pivot = medianOfEachGroup(sets, trackSteps, steps);

    if (trackSteps) {
        steps.push({
            step: "Pivot escolhido (Mediana das Medianas)",
            data: pivot
        });
    }

    let extractedData = partitionData(numericArr, pivot);

    if (trackSteps) {
        steps.push({
            step: "Particionamento do vetor usando o pivô",
            data: extractedData
        });
    }

    return conditionsFromOracle(
        extractedData,
        k,
        pivot,
        (a, b) => medianOfMedians(a, b, trackSteps, steps),
        trackSteps,
        steps
    );
}


/*
    Extrai valores numéricos caso o vetor contenha objetos
*/
let extractValues = (arr: number[] | AirQualitySample[]): number[] => {
    return arr.map((el: any) => typeof el === "number" ? el : el.value);
}

// Etapa 1: Divide um vetor em subconjuntos de tamanho máximo 5

let setsOf5 = (arr: number[]): number[][] => {

    let group: number[][] = [];
    for (let i = 0; i < arr.length; i += 5) {
        group.push(arr.slice(i, i + 5));
    }
    return group;
}

/*
    Etapa 2: Ordena cada subconjunto, extrai sua mediana e depois 
    pega a mediana desse conjunto de medianas
*/

let medianOfEachGroup = (
    sets: number[][],
    trackSteps?: boolean,
    steps?: StepLog[]
): number => {

    let medianOfMedians: number[] = [];

    sets.forEach((group, index) => {
        sortArr(group);
        let middleIndex = median(group);
        medianOfMedians.push(group[middleIndex]);

        if (trackSteps && steps)
            steps.push({
                step: `Mediana do grupo ${index + 1}`,
                data: { group, mediana: group[middleIndex] }
            });
    });

    sortArr(medianOfMedians);
    let middleIndex = median(medianOfMedians);
    return medianOfMedians[middleIndex];
};


/*  
    Etapa 3: Extrai dados do vetor original, sendo eles o número 
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
let conditionsFromOracle = (
    extractedData: PartitionInfo,
    k: number,
    pivot: number,
    medianOfMediansFn: (arr: number[], k: number) => number,
    trackSteps?: boolean,
    steps?: StepLog[]
): number => {

    let { partitionedArr, leftCounter } = extractedData;

    if (trackSteps && steps) {
        steps.push({
            step: "Verificando posição do pivô",
            data: { pivot, leftCounter, k }
        });
    }

    if (leftCounter === k - 1) {
        if (trackSteps && steps)
            steps.push({
                step: "Encontrou o elemento mediano",
                data: pivot
            });
        return pivot;
    }

    if (leftCounter > k - 1) {
        if (trackSteps && steps)
            steps.push({
                step: "Recursão para a esquerda",
                data: partitionedArr.slice(0, leftCounter)
            });

        return medianOfMediansFn(
            partitionedArr.slice(0, leftCounter),
            k
        );
    }

    if (trackSteps && steps)
        steps.push({
            step: "Recursão para a direita",
            data: partitionedArr.slice(leftCounter + 1)
        });

    return medianOfMediansFn(
        partitionedArr.slice(leftCounter + 1),
        k - (leftCounter + 1)
    );
};


/* Tipagem do particionamento */
export type PartitionInfo = {
    partitionedArr: number[],
    leftCounter: number,
    rightCounter: number,
}

/*
    Funções auxiliares
*/

// Função do índice da mediana
let median = (group: number[]): number => {
    let middleIndex: number;
    middleIndex = k(group);
    return middleIndex - 1;
}

// Função que extrai a metade do tamanho do vetor
let k = (group: number[]): number => {
    if (Number.isInteger(group.length / 2))
        return group.length / 2;
    else
        return Math.ceil(group.length / 2);
}

// Função que ordena o vetor
let sortArr = (arr: number[]): void => {
    arr.sort((a, b) => a - b);
}
