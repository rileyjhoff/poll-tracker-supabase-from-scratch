const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpobW93Z2N5YnRlcWdpd3dyeGxuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDc5OTQ2NjYsImV4cCI6MTk2MzU3MDY2Nn0.e8IeeowEcZ9C7aazuyONAepUhFvdOgDSLq8EKRJWwls';
const SUPABASE_URL = 'https://zhmowgcybteqgiwwrxln.supabase.co';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function createPoll(poll) {
    const response = await client
        .from('polls')
        .insert(poll);

    return response.body;
}

export async function getPolls() {
    const response = await client
        .from('polls')
        .select('*');

    return response.body;
}

export async function signIn(email, password) {
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function signUp(email, password) {
    const response = await client.auth.signUp({ email, password });

    return response.user;
}

export async function getUser() {
    const user = client.auth.user();

    return user;
}

export async function getSession() {
    return client.auth.session();
}

export async function checkSession() {
    const user = await getSession();

    if (!user) {
        location.replace('../');
    }
}

export async function redirectToPolls() {
    if (await getSession()) {
        location.replace('./polls');
    }
}

export async function logout() {
    await client.auth.signOut();

    return window.location.href = '../';
}

export async function deletePoll(id) {
    const response = await client
        .from('polls')
        .delete()
        .match({ id: id });

    return response.body;
}

export async function updatePoll(poll, id) {
    const response = await client
        .from('polls')
        .update({ question:poll.question, option1:poll.option1, option2:poll.option2, votes1:poll.votes1, votes2:poll.votes2 })
        .match({ id: id });

    return response.body;
}