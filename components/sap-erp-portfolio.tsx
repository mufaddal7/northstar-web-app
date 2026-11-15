import styles from "./sap-erp-portfolio.module.css";

const products = [
  {
    segment: "Smaller organizations",
    name: "SAP Business One",
    summary:
      "Core finance and operating processes for small and midsize businesses.",
    deployment:
      "On-premise or cloud-hosted options. Confirm who hosts, operates and updates the service.",
    fit: "You need an integrated foundation for accounting, purchasing, inventory and sales.",
  },
  {
    segment: "Midmarket cloud suite",
    name: "SAP Business ByDesign",
    summary:
      "A broad cloud ERP designed around connected processes for midsize organizations.",
    deployment:
      "Cloud service. Validate current market availability and the exact support and roadmap commitments.",
    fit: "You need an integrated suite and have confirmed its current commercial and lifecycle fit.",
  },
  {
    segment: "Standardized cloud ERP",
    name: "SAP S/4HANA Cloud Public Edition",
    summary:
      "A public-cloud route built around standardized processes and a managed release model.",
    deployment:
      "Public cloud SaaS. Confirm release cadence, supported configuration and extension choices.",
    fit: "Your teams can align to standard processes and want SAP to operate the cloud service.",
  },
  {
    segment: "Enterprise cloud transition",
    name: "SAP S/4HANA Cloud Private Edition",
    summary:
      "A managed private-cloud route for organizations with distinct transition or operating needs.",
    deployment:
      "Private cloud. Define infrastructure, upgrade, customization and service responsibilities.",
    fit: "You have complex requirements or an existing SAP landscape that shape the transition.",
  },
  {
    segment: "Customer-operated environment",
    name: "SAP S/4HANA on-premise",
    summary:
      "The S/4HANA route where the customer or its provider operates the environment.",
    deployment:
      "On-premise infrastructure. Plan for operations, security, upgrades and lifecycle management.",
    fit: "There is a clear reason to retain direct infrastructure and operating control.",
  },
] as const;

export function SapErpPortfolio({
  heading,
  description,
}: {
  heading: string;
  description: string;
}) {
  return (
    <figure className={styles.figure} aria-labelledby="sap-erp-portfolio-title">
      <figcaption className={styles.caption}>
        <p className={styles.eyebrow}>A portfolio, not one product</p>
        <h2 className={styles.heading} id="sap-erp-portfolio-title">
          {heading}
        </h2>
        <p className={styles.description}>{description}</p>
      </figcaption>
      <ol aria-label="SAP ERP products and deployment options" className={styles.grid}>
        {products.map((product, index) => (
          <li className={styles.card} key={product.name}>
            <span aria-hidden="true" className={styles.number}>
              0{index + 1}
            </span>
            <p className={styles.segment}>{product.segment}</p>
            <h3 className={styles.title}>{product.name}</h3>
            <p className={styles.summary}>{product.summary}</p>
            <dl className={styles.details}>
              <div>
                <dt>Deployment lens</dt>
                <dd>{product.deployment}</dd>
              </div>
              <div>
                <dt>Consider it when</dt>
                <dd>{product.fit}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ol>
      <p className={styles.note}>
        SAP ECC is an existing-generation system, not another S/4HANA edition.
        GROW with SAP and RISE with SAP are commercial and adoption programs;
        confirm the ERP edition and services included in each proposal.
      </p>
    </figure>
  );
}
