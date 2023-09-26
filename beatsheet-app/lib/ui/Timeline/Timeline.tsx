import styles from './timeline.module.css'
import {getRandomColor} from "@beatsheet-app/lib/ui/Timeline/util";
import {Beat} from "@beatsheet-app/lib/Beats/data-provider/types";
import {FC} from "react";

const Timeline: FC<{ sections: Array<Beat> | [] }> = ({sections = []}) => {
    const totalSections = sections?.length;

    return (
        <div className={styles.timeline}>
            {sections.length ? sections.map((section, index) => (
                <div
                    key={index}
                    className={styles.timelineSection}
                    style={{
                        minWidth: `${(100 / totalSections)}%`,
                        maxWidth: `${(100 / totalSections)}%`,
                        backgroundColor: getRandomColor(),
                    }}
                >
                    <span> {section.name.toLowerCase()}</span>
                </div>
            ))
                : <div className={styles.noBeats}>No Beats available</div>
            }
        </div>
    );
};

export default Timeline;