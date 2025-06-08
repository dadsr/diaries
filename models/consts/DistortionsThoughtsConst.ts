import {ThoughtItem} from "@/models/Types";

export const DistortionsThoughtsConst = {
ALL_OR_NOTHING: {
    displayName: 'הכל או כלום',
    description: 'ראיית הכל בשחור או לבן ללא גוונים. אם אני לא מצליח/ה בכל דבר, אני כישלון מוחלט. אירוע בודד נראה ככישלון קבוע שלא ישתנה לעולם. הסקת מסקנות מרופת מאירוע בודד.'
},
OVERGENERALIZATION: {
    displayName: 'הכללה',
    description: 'כשלתי במבחן אחד, אני כישלון מוחלט. רואה את עצמי ואת העולם מתוך כישלון יחיד ומחיל אותו על הכל.'
},
MENTAL_FILTER: {
    displayName: 'מסננת שלילית',
    description: 'רואה רק את השלילי ומתעלם מהחיובי. מתמקד בפרטים שליליים ומתעלם מהצלחות או דברים טובים שקרו.'
},
DISQUALIFYING_THE_POSITIVE: {
    displayName: 'פסילה בערך תכונות חיוביות',
    description: 'כולם אומרים לי שאני מצליח/ה ומצליח/ה, אבל אני בטוח/ה שהם טועים או סתם מנחמים אותי. מתעלם/ת מהערכה חיובית וממעיט/ה בערכה.'
},
CATASTROPHIZING: {
    displayName: 'קפיצה למסקנות',
    description: 'אני בטוח/ה שיקרה משהו רע בעתיד, למרות שאין לכך הוכחה. נבואה שמגשימה את עצמה.'
},
FORTUNE_TELLING: {
    displayName: 'ראיית עתיד',
    description: 'אני בטוח/ה שמשהו רע יקרה, למרות שאין לכך בסיס אמיתי. תחזית שלילית על סמך תחושות בלבד.'
},
EMOTIONAL_REASONING: {
    displayName: 'שיפוט רגשי',
    description: 'אני מרגיש/ה רע, ולכן זה אומר שאני באמת גרוע/ה, לא מוצלח/ת, לא אהוב/ה וכו\'.'
},
SHOULD_STATEMENTS: {
    displayName: 'הנחיות של צריך/חייב/אסור',
    description: 'הצבת דרישות נוקשות לעצמי או לאחרים ("אני חייב", "אני צריך", "אסור לי"), מה שמוביל לאשמה, תסכול או כעס.'
},
LABELING: {
    displayName: 'תיוג',
    description: 'הדבקת תווית שלילית לעצמי או לאחרים ("אני כישלון", "הוא עצלן"), במקום להתייחס להתנהגות הספציפית.'
},
PERSONALIZATION: {
    displayName: 'ייחוס אישי',
    description: 'אני לוקח/ת אחריות על דברים שליליים גם כשאין לכך סיבה. מסיק/ה בטעות שהאירוע נגרם באשמתי או משקף חוסר יכולת שלי.'
},
BLAMING: {
    displayName: 'האשמה עצמית או האשמת אחרים',
    description: 'מאשים/ה את עצמי או את האחרים במצבים שליליים, גם כאשר אין לכך הצדקה אמיתית.'
}
} as const;

export type DistortionsThoughtKey = keyof typeof DistortionsThoughtsConst;


export const distortionsThoughtsArray: ThoughtItem[] = Object.entries(DistortionsThoughtsConst).map(
    ([key, value]) => ({
        id: key ,
        displayName: value.displayName,
        description: value.description,
    })
);
