import { useTranslation } from 'react-i18next';

function Featuerd() {
  const { t } = useTranslation(); // استخدام الترجمة

  return (
    <section className="features lg:absolute bottom-[-50px] z-[999] w-full">
      <div className="container mx-auto cursor-pointer py-12 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <FeatureCard
            title={t('featured.card1_title')}  // استخدام الترجمة
            description={t('featured.card1_description')}  // استخدام الترجمة
          />
          {/* Card 2 */}
          <FeatureCard
            title={t('featured.card2_title')}  // استخدام الترجمة
            description={t('featured.card2_description')}  // استخدام الترجمة
          />
          {/* Card 3 */}
          <FeatureCard
            title={t('featured.card3_title')}  // استخدام الترجمة
            description={t('featured.card3_description')}  // استخدام الترجمة
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
