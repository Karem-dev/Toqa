function Featuerd() {
    return (
      <section className="features lg:absolute bottom-[-50px] z-[999] w-full">
        <div className="container mx-auto cursor-pointer py-12 px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <FeatureCard
              title="All Courses"
              description="Explore a variety of courses designed to expand your knowledge and skills. Learn at your own pace with expert instructors."
            />
            {/* Card 2 */}
            <FeatureCard
              title="Virtual Class"
              description="Join live, interactive classes from anywhere. Engage with instructors and fellow students in real-time."
            />
            {/* Card 3 */}
            <FeatureCard
              title="Real Meeting"
              description="Meet with instructors and peers in person to discuss course material and engage in collaborative learning."
            />
          </div>
        </div>
      </section>
    );
  }
  
  // Reusable FeatureCard Component
  const FeatureCard = ({ title, description }) => (
    <div className="relative group h-[200px] ">
      <div className="bg-slate-900 text-[#f5a425] p-6 rounded-lg shadow-lg overflow-hidden">
        <h3 className="text-2xl font-semibold transition-opacity duration-500 group-hover:opacity-0">
          {title}
        </h3>
  
        <div className="absolute inset-0  bg-[#f5a425] text-white py-14 px-5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-1000 flex items-center">
          <p className=" text-xl ">{description}</p>
        </div>
      </div>
    </div>
  );
  
  export default Featuerd;
  