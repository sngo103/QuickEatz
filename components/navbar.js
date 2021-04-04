import Head from 'next/head'
import Link from 'next/link'

export default function navbar() {
    return (
        <div className="navbar">
            <a href="/">Home</a>
            <a href="/login">Login</a>
        </div>
    );
}
