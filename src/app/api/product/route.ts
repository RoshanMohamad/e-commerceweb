import { databases, ID, Query } from "@/lib/appwrite";

export async function POST() {
    const body = await request.json();
    
    try {
        const response = await databases.createDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID!,
            process.env.NEXT_PUBLIC_COLLECTION_ID!,
            ID.unique(),
            body
        );
        return new Response(JSON.stringify(response), { status: 201 });
        } catch (error) {
        console.log(error);
        return new Response("Database Error", { status: 500 });
    }
}

export async function GET() {
    try {
        const response = await databases.listDocuments(
            process.env.NEXT_PUBLIC_DATABASE_ID!,
            process.env.NEXT_PUBLIC_COLLECTION_ID!
        );
        return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Database Error", { status: 500 });
    }
}

export async function PUT(request: Request) {
    const body = await request.json();
    const { id } = body;
    try {
        const response = await databases.updateDocument
        (
            process.env.NEXT
}