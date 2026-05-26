import React from 'react';
import Heading from './Heading';
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';

const testimonials = [
    {
        quote:
            "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
        name: "Charles Dickens",
        title: "A Tale of Two Cities",
    },
    {
        quote:
            "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
        name: "William Shakespeare",
        title: "Hamlet",
    },
    {
        quote: "All that we see or seem is but a dream within a dream.",
        name: "Edgar Allan Poe",
        title: "A Dream Within a Dream",
    },
    {
        quote:
            "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
        name: "Jane Austen",
        title: "Pride and Prejudice",
    },
    {
        quote:
            "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
        name: "Herman Melville",
        title: "Moby-Dick",
    },
];


const SectionReviews: React.FC = () => {
    return (
        <section id="reviews" className="bg-[var(--background)]">
            <Heading heading='Reviews' headingDescription='See what our customers are saying about us.' />
            <div data-aos="fade-up">
                <div className="w-full overflow-hidden leading-[0] bg-[var(--menuItemHoverBg)]" >
                    <svg
                        className="relative block rotate-y-180"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none"
                    >
                        <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="fill-[var(--mainColor)]"></path>
                        <path d="M1250 120L0 12.48 0 0 1200 0 1200 120z" className="fill-[var(--background)]"></path>
                    </svg>
                </div>
                <div className="flex flex-col justify-center items-center bg-[var(--menuItemHoverBg)]">
                    <InfiniteMovingCards
                        items={testimonials}
                        direction="right"
                        speed="normal"
                    />
                    <InfiniteMovingCards
                        items={testimonials}
                        direction="left"
                        speed="normal"
                        className='hidden md:block'
                    />
                </div>
                <div className="w-full overflow-hidden leading-[0] rotate-180 bg-[var(--menuItemHoverBg)]" >
                    <svg
                        className="relative block"
                        style={{ transform: 'rotateY(180deg)' }}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none"
                    >
                        <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="fill-[var(--mainColor)]"></path>
                        <path d="M1250 120L0 13.48 0 0 1200 0 1200 120z" className="fill-[var(--background)]"></path>
                    </svg>
                </div>
            </div>
        </section>
    )
}

export default SectionReviews