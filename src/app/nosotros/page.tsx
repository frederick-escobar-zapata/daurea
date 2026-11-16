// src/app/nosotros/page.tsx
import Link from 'next/link';

export default function NosotrosPage() {
  return (
    <div className="page-surface py-5">
      <div className="container py-4">
        
        {/* ENCABEZADO PRINCIPAL */}
        <div className="text-center mb-5">
          <span className="badge about-label text-uppercase mb-2 px-3 py-2">
            Nuestra Esencia
          </span>
          <h1 className="fw-bold text-uppercase text-dark font-serif display-5 mb-3">
            Sobre D'ÁUREA
          </h1>
          <p className="text-muted about-intro mx-auto">
            Diseñamos y seleccionamos piezas exclusivas que realzan tu estilo personal, combinando la sofisticación de la plata fina con la resistencia inquebrantable del acero quirúrgico.
          </p>
        </div>

        {/* SECCIÓN HISTORIA / MISIÓN */}
        <div className="row g-5 align-items-center mb-5 bg-white p-4 p-md-5 rounded-3 shadow-sm">
          <div className="col-12 col-lg-6">
            <h3 className="fw-bold text-dark font-serif mb-4">
              El brillo que hace única cada ocasión
            </h3>
            <p className="text-muted about-copy">
              En <strong>D'ÁUREA</strong> creemos que los accesorios no son solo un complemento, sino una extensión de tu identidad. Cada joya de nuestro catálogo es elegida bajo estrictos estándares de calidad, garantizando piezas duraderas, hipoalergénicas y con acabados de alta gama.
            </p>
            <p className="text-muted about-copy mb-4">
              Ya sea que busques la delicadeza clásica de la <strong>Plata 925</strong> o la versatilidad moderna del <strong>Acero Quirúrgico</strong>, tenemos el detalle perfecto para acompañarte en tu día a día o en tus momentos más especiales.
            </p>
            <Link href="/tienda" className="btn btn-dark px-4 py-2 fw-semibold shadow-sm">
              Explorar Colección
            </Link>
          </div>
          <div className="col-12 col-lg-6">
            <div className="rounded-3 overflow-hidden shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800" 
                alt="Joyas D'Áurea Exclusivas" 
                className="about-image w-100 object-fit-cover"
              />
            </div>
          </div>
        </div>

        {/* VALORES DE LA MARCA */}
        <div className="row g-4 text-center">
          <div className="col-12 col-md-4">
            <div className="bg-white p-4 rounded-3 shadow-sm h-100">
              <div className="fs-1 mb-3">✨</div>
              <h5 className="fw-bold text-dark font-serif">Calidad Garantizada</h5>
              <p className="text-muted about-value-copy small m-0">
                Materiales nobles y certificados que aseguran brillo duradero, resistencia y cero irritaciones en tu piel.
              </p>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="bg-white p-4 rounded-3 shadow-sm h-100">
              <div className="fs-1 mb-3">🛡️</div>
              <h5 className="fw-bold text-dark font-serif">Acero & Plata</h5>
              <p className="text-muted about-value-copy small m-0">
                Especialistas en piezas de acero quirúrgico resistentes al agua y joyería fina en Plata 925 de alta pureza.
              </p>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="bg-white p-4 rounded-3 shadow-sm h-100">
              <div className="fs-1 mb-3">📦</div>
              <h5 className="fw-bold text-dark font-serif">Envíos Seguros</h5>
              <p className="text-muted about-value-copy small m-0">
                Despachos protegidos a todo Chile con envoltorio corporativo listo para regalar o regalarte.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}