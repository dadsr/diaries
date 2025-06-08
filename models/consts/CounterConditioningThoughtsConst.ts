import {ThoughtItem} from "@/models/Types";

export const CounterConditioningThoughtConst = {

ALL_OR_NOTHING_COUNTER: {
    displayName: 'מחשבה מאזנת להכל או כלום',
    description: 'החיים הם לא שחור או לבן. גם אם לא הצלחתי במשהו אחד, יש לי הרבה הצלחות אחרות. אני יכול/ה להשתפר ולהתקדם.'
},
OVERGENERALIZATION_COUNTER: {
    displayName: 'מחשבה מאזנת להכללה',
    description: 'זה שאירוע אחד לא הצליח לא אומר שכל דבר ייכשל. היו לי גם הרבה הצלחות בעבר, וזה רק מקרה בודד.'
},
MENTAL_FILTER_COUNTER: {
    displayName: 'מחשבה מאזנת למסננת שלילית',
    description: 'אני בוחר/ת לראות גם את הדברים הטובים שקרו לי. יש לי הישגים וחוויות חיוביות לצד הקשיים.'
},
DISQUALIFYING_THE_POSITIVE_COUNTER: {
    displayName: 'מחשבה מאזנת לפסילה בערך תכונות חיוביות',
    description: 'ההצלחות שלי אמיתיות, ואני יכול/ה להכיר בהן. מגיע לי להרגיש טוב לגבי הדברים שהשגתי.'
},
CATASTROPHIZING_COUNTER: {
    displayName: 'מחשבה מאזנת לקפיצה למסקנות',
    description: 'אין לי דרך לדעת מה יקרה בעתיד, אז עדיף להתרכז בכאן ועכשיו ולפעול בצורה חיובית.'
},
FORTUNE_TELLING_COUNTER: {
    displayName: 'מחשבה מאזנת לראיית עתיד',
    description: 'אני לא נביא/ה. ייתכן שיקרו גם דברים טובים. אתמקד במה שאני יכול/ה לעשות עכשיו.'
},
EMOTIONAL_REASONING_COUNTER: {
    displayName: 'מחשבה מאזנת לשיפוט רגשי',
    description: 'הרגשות שלי חשובים, אבל הם לא תמיד משקפים את המציאות. אני יכול/ה לבדוק עובדות ולשקול דברים בצורה רציונלית.'
},
SHOULD_STATEMENTS_COUNTER: {
    displayName: 'מחשבה מאזנת להנחיות של צריך/חייב/אסור',
    description: 'אני עושה כמיטב יכולתי. מותר לי לטעות וללמוד. אין צורך להציב לעצמי דרישות בלתי אפשריות.'
},
LABELING_COUNTER: {
    displayName: 'מחשבה מאזנת לתיוג',
    description: 'אני לא תווית. לפעמים אני מצליח/ה ולפעמים פחות, וזה חלק מהיותי אנושי/ת.'
},
PERSONALIZATION_COUNTER: {
    displayName: 'מחשבה מאזנת לייחוס אישי',
    description: 'לא הכל תלוי בי. יש גורמים נוספים שמשפיעים על המצב. אני לוקח/ת אחריות רק על מה שבשליטתי.'
},
BLAMING_COUNTER: {
    displayName: 'מחשבה מאזנת להאשמה עצמית או האשמת אחרים',
    description: 'אשמה לא עוזרת לי להתקדם. עדיף לבדוק מה אפשר ללמוד מהמצב ואיך אפשר להשתפר להבא.'
}
} as const;

export type CounterThoughtKey = keyof typeof CounterConditioningThoughtConst;

export const counterConditioningThoughtsArray: ThoughtItem[] = Object.entries(CounterConditioningThoughtConst).map(
    ([key, value]) => ({
        id: key,
        displayName: value.displayName,
        description: value.description,
    })
);
