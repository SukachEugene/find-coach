export default {
    async contactCoach(context, payload) {
        const newRequest = {
            userEmail: payload.email,
            message: payload.message
        };
        const responce = await fetch(`https://find-a-coach-544ea-default-rtdb.europe-west1.firebasedatabase.app/requests/${payload.coachId}.json`, {
            method: 'POST',
            body: JSON.stringify(newRequest)
        });

        const responceData = await responce.json();

        if (!responce.ok) {
            const error = new Error(responceData.message || 'Failed to send request.');
            throw error;
        }

        newRequest.id = responceData.name;
        newRequest.coachId = payload.coachId;

        context.commit('addRequest', newRequest);
    },
    async fetchRequests(context) {
        const coachId = context.rootGetters.userId;
        const token = context.rootGetters.token;
        const responce = await fetch(`https://find-a-coach-544ea-default-rtdb.europe-west1.firebasedatabase.app/requests/${coachId}.json?auth=` + token);
        const responceData = await responce.json();

        if (!responce.ok) {
            const error = new Error(responceData.message || 'Failed to fetch requests.');
            throw error;
        }

        const requests = [];
        for (const key in responceData) {
            const request = {
                id: key,
                coachId: coachId,
                userEmail: responceData[key].userEmail,
                message: responceData[key].message
            }
            requests.push(request);
        }

        context.commit('setRequests', requests);
    }
}