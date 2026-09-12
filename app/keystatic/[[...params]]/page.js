import { notFound } from "next/navigation";
import Editor from "./editor";
export default function AdminPage() { if (process.env.NODE_ENV === "production") notFound(); return <Editor />; }
