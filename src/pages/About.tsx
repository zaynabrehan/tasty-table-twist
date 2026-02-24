import restaurantInterior from "@/assets/restaurant-interior.jpg";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-display font-bold text-foreground mb-2">
          About <span className="text-gradient-gold">Jushhpk</span>
        </h1>
        <p className="text-muted-foreground font-body">Our story, our passion</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
        <div className="rounded-2xl overflow-hidden shadow-card">
          <img
            src={restaurantInterior}
            alt="Jushhpk Restaurant interior with warm ambient lighting"
            className="w-full h-80 object-cover"
          />
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-display font-bold text-foreground">
            A Legacy of Flavor
          </h2>
          <p className="text-muted-foreground font-body leading-relaxed">
            Born in the heart of Lahore, Jushhpk brings together the rich culinary traditions of Pakistan with a modern dining experience. Every dish tells a story — of spices ground fresh, of recipes passed down through generations, of flavors that bring people together.
          </p>
          <p className="text-muted-foreground font-body leading-relaxed">
            Our chefs use only the finest ingredients, sourced locally and prepared with meticulous attention to detail. From our signature Seekh Kebabs to our aromatic Biryanis, every bite is crafted to deliver an unforgettable experience.
          </p>
          <div className="grid grid-cols-3 gap-4 pt-4">
            {[
              { label: "Years", value: "10+" },
              { label: "Dishes", value: "50+" },
              { label: "Happy Customers", value: "1M+" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-display font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground font-body mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
