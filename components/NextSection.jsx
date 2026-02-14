import { motion } from "framer-motion"

export function NextSection() {
  return (
    <section className="ps-[4.5rem] min-h-screen flex items-center justify-center bg-white">
      <motion.div
        initial={{ opacity: 0, y: 120 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="text-6xl font-bold text-stone-900">New Collection</h2>
        <p className="mt-4 text-xl text-stone-600 max-w-xl">
          Discover handmade crafts designed to brighten your home.
        </p>
      </motion.div>
    </section>
  )
}
