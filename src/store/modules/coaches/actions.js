export default {
    async registerCoach(context, data) {
        const userId = context.rootGetters.userId;
        const coachData = {
            firstName: data.first,
            lastName: data.last,
            description: data.desc,
            hourlyRate: data.rate,
            areas: data.areas
        };

        const token = context.rootGetters.token;

        const responce = await fetch(`https://find-a-coach-544ea-default-rtdb.europe-west1.firebasedatabase.app/coaches/${userId}.json?auth=` + token, {
            method: 'PUT',
            body: JSON.stringify(coachData)
        });

        // const responceData = await responce.json();

        if (!responce.ok) {
            // error
        }

        context.commit('registerCoach', {
            ...coachData,
            id: userId
        })
    },
    async loadCoaches(context, payload) {

        if (!payload.forceRefresh && !context.getters.shouldUpdate) {
            return;
        }

        const responce = await fetch('https://find-a-coach-544ea-default-rtdb.europe-west1.firebasedatabase.app/coaches.json');
        const responceData = await responce.json();

        if (!responce.ok) {
            const error = new Error(responceData.message || 'Failed to fetch!');
            throw error;
        }

        const coaches = [];
        for (const key in responceData) {
            const coach = {
                id: key,
                firstName: responceData[key].firstName,
                lastName: responceData[key].lastName,
                description: responceData[key].description,
                hourlyRate: responceData[key].hourlyRate,
                areas: responceData[key].areas
            };
            coaches.push(coach);
        }

        context.commit('setCoaches', coaches);
        context.commit('setFetchTimestamp');

    }
}