import React, { useContext, useState } from 'react';
import { ThemeContext } from '../../../../themeProvider';

const timeLines = [
  {
    time: '8:22',
    title: 'Keep the rhythm up',
    trigger: 'Prompted for talking points and still missed covering it.',
    feedback: 'Pay attention to goals of the conversation',
    alternative: 'NA',
    links: ['www.url.de/article', 'www.url/de/aticle#2'],
  },
  {
    time: '12:15',
    title: 'Let the doctor speak',
    trigger: '',
    feedback: '',
    alternative: 'NA',
    links: ['www.url.de/article', 'www.url/de/aticle#2'],
  },
  {
    time: '27:05',
    title: 'leaving out talking options',
    trigger: '',
    feedback: '',
    alternative: 'NA',
    links: ['www.url.de/article', 'www.url/de/aticle#2'],
  },
];
const AnalysisTimeline = () => {
  const [selectedAccordion, setSelectedAccordion] = useState<number | null>(null);

  const { theme } = useContext(ThemeContext);
  const handleClickCollapse = (index: number) => {
    setSelectedAccordion((prev) => (prev === index ? null : index));
  };
  return (
    <>
      <div className="accordion accordion-flush">
        {timeLines.map((timeline, index) => (
          <div className={`accordion-item ${theme === 'Light' ? 'light-mode' : null}`} key={index}>
            <h2 className="accordion-header" id="flush-headingOne">
              <button
                className={`accordion-button ${selectedAccordion === index ? '' : 'collapsed'}`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseOne"
                aria-expanded="false"
                aria-controls="flush-collapseOne"
                onClick={() => handleClickCollapse(index)}
              >
                {timeline.time} - {timeline.title}
              </button>
            </h2>
            <div
              id="flush-collapseOne"
              className={`accordion-collapse collapse ${selectedAccordion === index ? 'show' : ''}`}
              aria-labelledby="flush-headingOne"
              data-bs-parent="#accordionFlushExample"
            >
              <div className={`accordion-body ${theme === 'Light' ? 'light-mode' : null}`}>
                <div className="row">
                  <div className="col-12 col-xl-4">
                    <div className="row pb-2">
                      <div className="col-5">
                        <span>Trigger:</span>
                      </div>
                      <div className="col-7">
                        <span>{timeline.trigger}</span>
                      </div>
                    </div>
                    <div className="row pb-2">
                      <div className="col-5">
                        <span>Feedback meaning:</span>
                      </div>
                      <div className="col-7">
                        <span>{timeline.feedback}</span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-5">
                        <span>Alternative meaning:</span>
                      </div>
                      <div className="col-7">
                        <span>{timeline.alternative}</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-xl-4 row pt-2 pt-xl-0">
                    <label htmlFor="link" className="col-3">
                      Links:
                    </label>
                    <div className="col-9">
                      {timeline.links.map((link, index1) => (
                        <div key={index1} className="pb-2">
                          <a href={link}>
                            <i className="bi bi-box-arrow-up-right pe-2"></i>
                            {link}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="col-12 col-xl-4">
                    <div
                      className={`card analysis-survey ${theme === 'Light' ? 'light-mode' : null}`}
                    >
                      <div className="card-body">
                        <h5 className="fw-bold mb-3">Was this Analysis accurate?</h5>
                        <span className="card-link">
                          <i className="bi bi-hand-thumbs-up-fill text-success"></i> Yes!
                        </span>
                        <span className="card-link">
                          <i className="bi bi-hand-thumbs-down-fill text-danger"></i> No!
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AnalysisTimeline;
