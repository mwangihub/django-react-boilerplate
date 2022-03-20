import React from 'react'
import { format } from 'date-fns';

export default function Footer() {
    var date = format(new Date(), 'EEEE, MMMM do, yyyy HH:mm:ss a');
    return (
        <div className="container py-3">
            <footer className="pt-3 mt-4 text-muted border-top">
             {date} | <a href="https://www.djangoproject.com/start/" className="text-decoration-none">&copy;  Django&trade;</a>
            </footer>
        </div>
    )
}
