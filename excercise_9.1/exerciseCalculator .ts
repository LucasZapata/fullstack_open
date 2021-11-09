//days - training days - target value - average time - reached - rating -rating_desc

interface results {
    days:number
    daysTrained:number
    success:boolean
    rating:number
    ratingDesc:string
    target:number
    average:number
}

export interface excerciseInput {
    dailyTraining:Array<number>
    target:number
}

/* const parse = ():excerciseInput => {
    console.log(process.argv);
    if (process.argv.length !== 2)
        throw new Error(`Requires two arguments, provided ${process.argv.length}`);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const days:Array<string> = JSON.parse(process.argv[0]);
    const target = process.argv[1];
    const result:excerciseInput = {
        dailyTraining:[],
        target:0
    };
    result.dailyTraining = days.map(value => {
        if (isNaN(Number(value)))
            throw new Error('First argumen must contain numbers');
        else
            return Number(value);
    });
    if (isNaN(Number(target)))
        throw new Error('Second argument must be a number');
    result.target = Number(target);
    return result;
}; */

const getAverage = (days:Array<number>) => {
    let total = 0;
    days.forEach(value => {total += value;});
    return (total / days.length);
};

export const analyze = (input:excerciseInput):results => {
    const result:results = {days:0,
        daysTrained:0,
        success:false,
        rating:0,
        ratingDesc:'',
        target:0,
        average:0};
    result.days = input.dailyTraining.length;
    result.daysTrained = input.dailyTraining.filter(h => h !== 0).length;
    result.target = input.target;
    result.average = getAverage(input.dailyTraining);
    result.success = (result.average >= input.target);
    if (result.success){
        result.rating = 3;
        result.ratingDesc = "Well done";
    }
    else if (result.average < 1){
        result.rating = 1;
        result.ratingDesc = "Need more excercise";
    }
    else{
        result.rating = 2;
        result.ratingDesc = "Not bad, but didn't reach the target";
    }
    return result;
};

//const input = parse();
//console.log(analyze(input));
