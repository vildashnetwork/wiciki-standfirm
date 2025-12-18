
import styles from "./EmptyState.module.css";

const AuthImagePattern = ({ title, subtitle }) => {



  // return (
  //   <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
  //     <div className="max-w-md text-center">
  //       <div className="grid grid-cols-3 gap-3 mb-8">
  //         {[...Array(9)].map((_, i) => (
  //           <div
  //             key={i}
  //             className={`aspect-square rounded-2xl bg-primary/10 ${i % 2 === 0 ? "animate-pulse" : ""
  //               }`}
  //           />
  //         ))}
  //       </div>
  //       <h2 className="text-2xl font-bold mb-4">{title}</h2>
  //       <p className="text-base-content/60">{subtitle}</p>
  //     </div>
  //   </div>
  // );

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.grid}>
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`${styles.square} ${i % 2 === 0 ? styles.pulse : ""
                }`}
            />
          ))}
        </div>

        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
    </div>
  );


};

export default AuthImagePattern;