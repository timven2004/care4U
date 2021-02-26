import * as Knex from "knex";
// import { hashPassword, checkPassword } from "../hash";


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("doctors").del();
    await knex("users").del();
    // Inserts seed entries

    await knex("users").insert([
        { name: "jason", password: "1234", email: "jason@jason.com", telephone: "12345678" },
        { name: "alex", password: "2345", email: "alex@alex.com", telephone: "23456789" },
        { name: "gordon", password: "3456", email: "gordon@gordon.com", telephone: "34567890" }
    ])

    await knex("doctors").insert([
    { name: "Dr.CHAN, Christian Shaunlyn 陳濬靈", password: "12345", email: "shaunlyn@hku.hk", telephone: "39177121", description:
"Department of Psychology, The University of Hong Kong, Pokfulam Hong Kong" },
    { name: "Ms. CHAN, Ching 陳婧", password: "23456", email: "info@illuminate.com.hk", telephone: "57410822", description:
"Illuminate Psychotherapy & Growth" },
    { name: "Miss CHAN, Mee Fung May 陳美鳯", password: "34567", email: " jollybird@graduate.hku.hk", telephone: "27139174", description:
"SKH Counselling Service" },
    { name: "Dr. KEUNG, Yuen Nai Winnie 姜源妮", password: "45678", email: "ynkeung@gmail.com", telephone: "28758233", description:
"Home Psychological Services" },
    { name: "Ms. LAM, Yue Tung Candice 林玥彤 ", password: "56789", email: "info@mindcare.com.hk", telephone: "28863839", description:
"MindCare" },
    { name: "Ms. LAU, Kit Yee Magdalene 劉潔懿", password: "67890", email: "laukityeemaggie@gmail.com", telephone: "54045244", description:
"private practitioner" },
    { name: "Dr. LEE, Man Kwan Jacen 李玟頵", password: "78901", email: "npsyhk@gmail.com", telephone: "27308166", description:
"Hong Kong Clinical Neuropsychology Service" },
    { name: "Dr. LEE, Wing Ming Mary 李穎明", password: "89012", email: "ECG@threebb.com.hk", telephone: "27117525", description:
"Independent practice" },
    { name: "Miss LEUNG, Yee Ling 梁漪鈴", password: "90123", email: "mhpelaineleung@gmail.com", telephone: "35869881", description:
"Private Practice Clinical Psychologist" },
    { name: "Dr. TAM, Yat Sun Joseph 譚日新", password: "00123", email: "npsyhk@gmail.com", telephone: "35066308", description:
"Alpha Clinic/Hospital Authority" },

])

};
