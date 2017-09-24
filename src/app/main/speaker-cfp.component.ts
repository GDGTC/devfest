import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-speaker-cfp',
    template: `
    <style>
         section p {
            margin: 16px 0;
        }
        section {
            max-width: 945px;
        }
        h4, h3 {
            margin-top:16px;
        }
        li {
            margin-left:16px;
        }
    </style>
    <section style="text-align:left;">
        <div class="callout">Call for Speakers</div>

        <p>The DevFestMN 2018 Call for Speakers is officially open! If you are interested in presenting (or know someone who might be), read on. Submissions will be accepted until Friday, November 3rd at 11:59pm CST.</p>

        <h3>About the Conference</h3>
        <p>When: Saturday, February 10, 2018</p>
        <p>Where: St. Thomas University, Minneapolis, MN</p>

        <p>DevFestMN was founded in 2014 and is organized by GDG Twin Cities, a group of Google Developer practitioners and enthusiasts. The conference draws many of the best technologists from our region, plus many Google employees who attend and present. This year we expect to have over 400 attendees join the event and share the experience.</p>

        <h3>What We're Looking For</h3>
        <p>We're seeking a diverse mix of content and speakers for this year's conference. Most sessions at DevFestMN are technical, but we're also interested in submissions that discuss nontechnical topics relevant to technology practitioners. Ultimately, we're looking for speakers who have something interesting to say and are excited to share their knowledge with others. </p>

        <p>We welcome speakers of all experience levels, including those who have never before presented at a conference.</p>

        <p>If you're looking for inspiration or examples of the type of content that would be a good fit for DevFestMN, check out the sample topics at the end of this CFP. </p>

        <h3>Why You Should Present and How We Can Help</h3>
        <p>DevFestMN is an opportunity to present to a friendly and engaged audience. This is a great way for you to share your passion, increase the strength of your network and advance your career. </p>

        <p>We'll be hosting 2 Google Hangout sessions to answer your questions about this Call for Speakers, help you brainstorm and vet potential topics, or provide advice for making your content more engaging. Dates and links:</p>

        <div><a href="https://hangouts.google.com/call/kXj8ELFdbU73_BO9ekPIAAEE">Tuesday, October 10 6:00-7:00pm</a></div>
        <div><a href="https://hangouts.google.com/call/GkHW3U38BJjN7KHhl-VrAAEE">Sunday, October 22 3:00-4:00pm</a></div>

        <p>Additionally, we've compiled some resources here that you may find helpful:</p>

        <ul>
            <li><a href="http://weareallaweso.me/">We Are All Awesome</a> - Created by JSConf EU co-organiser Tiffany Conroy, this site is a great resource for speakers</li>
            <li><a href="https://twitter.com/hashtag/speakerconfessions?f=tweets">#SpeakerConfessions</a> - Encouragement, advice and laughs from speakers on Twitter</li>
            <li><a href="https://github.com/vmbrasseur/Public_Speaking/blob/master/README.md">Public Speaking on Github</a> - Repo full of links to public speaking resources</li>
            <li><a href="https://techspeak.email/">Technically Speaking</a> - A monthly newsletter created by Chiu-Ki Chan and Cate Huston, focusing on resources and advice for speakers</li>
            <li><a href="https://www.meetup.com/Women-Who-Code-Twin-Cities/">Women Who Speak</a> - Monthly meetup hosted by Women Who Code - Twin Cities, where folks who identify as women or gender non-binary can learn speaking tips and practice giving talks</li>
        </ul>

        <p>If you need practice giving talks, get in touch, and we can connect you with local groups who may be seeking presenters.</p>

        <p>If you have a specific question that isn't answered in those resources and you can't make either of the Hangouts listed above, shoot us an email: info@devfest.mn (just don't use this to submit a proposal).</p>

        <h3>The Selection Process</h3>
        <p>Here's a rough outline for how we select the talks for DevFestMN:</p>

        <ul>
            <li>Anonymize submissions, so we don't bias against anything related to the submitting person.</li>
            <li>
                Two rounds of voting:
                <ul>
                    <li>The first round rates each talk on a scale from 1 to 10.</li>
                    <li>The top-N (~50) submissions are rated again on a 3-point scale: “meh”, “yay”, “MUST HAVE”.</li>
                </ul>
            </li>
            <li>De-anonymize so we can (finally) bias against speaker details.</li>
            <li>…and a number of details that we make up as we go along.</li>
        </ul>

        <h3>Session Length</h3>
        <p>Most sessions are 45 minutes in length.  If you want to leave time for questions and discussion at the end (completely optional), plan your presentation accordingly. We'll also be organizing some sessions for 10 minute lightning talks and we're open to considering a few 90 minute Codelab style sessions.</p>

        <h3>Guide for Speakers</h3>
        <p>Our attendees come to learn, so we'll want you to shy away from sales pitches and anything that sounds like advertising. We welcome you presenting work you've done as long as it's informational and instructive.</p>

        <p>All talks will be recorded and published on the internet for free, along with a recording of the slide deck, live-demo or other on-presenter-screen activity. We do this for the benefit of the larger GDG and tech community, and those who can't make it to the conference. We hope you want to help out, but if you are in any way uncomfortable, let us know and we will work things out.</p>

        <p>We will ask to see your slides in advance of the conference to ensure the content is a good fit for our audience.</p>

        <h3>Important Dates</h3>
        <div>Deadline for submission: Friday, November 3rd by midnight</div>
        <div>Notification of acceptance: Friday, December 1st</div>
        <div>Deadline for presentation submission: Friday, February 2 by midnight</div>

        <h3>How to Submit</h3>
        <p>Our best advice is to keep your submission short and sweet. We won't impose a limit on length, but we suggest that it be no longer than 250 words. Engaging titles and descriptions tend to attract more attendees to your session, so we recommend spending some time fine-tuning this portion.</p>

        <p>When you're ready, submit your application using this Google form:</p>
        <div><a href="https://goo.gl/forms/6WPq9fKVHgq8qeWF3">https://goo.gl/forms/6WPq9fKVHgq8qeWF3</a></div>

        <p>We look forward to seeing you at DevFestMN 2018,</p>

        <p>DevFestMN 2018 Organizers</p>


        <h3>Sample Topics</h3>
        <p>This list is by no means exhaustive, so don't feel constrained by it. Additionally, you can find examples of past sessions here: <a href="https://devfest.mn/past">https://devfest.mn/past</a></p>

        <h4>Android</h4>
        <ul>
        <li>ConstraintLayout API library</li>
        <li>Architecture and/or Architecture Components</li>
        <li>Kotlin</li>
        <li>RxJava</li>
        <li>Animations</li>
        <li>Testing (UI, Unit, Integration, Etc)</li>
        <li>Google Assistant on Android</li>
        <li>Instant Apps</li>
        <li>Firebase on Android</li>
        <li>CoordinatorLayout</li>
        <li>SupportLibrary</li>
        <li>Android security</li>
        <li>Gradle/Build Systems</li>
        <li>Tools – Lint/Checkstyles/Android Studio/etc</li>
        <li>Android Things</li>
        <li>On-device machine learning: TensorFlow on Android</li>
        </ul>

        <h4>Google Cloud Platform</h4>
        <ul>
        <li>All about Cloud Functions</li>
        <li>Machine Learning with TensorFlow</li>
        <li>Industrial IoT with GCP IoT Core</li>
        <li>"Where should I run my code?" Compute Engine, Container Engine, App Engine?</li>
        <li>A deep dive into usability design</li>
        <li>Apache Beam: Portable and Parallel Data Processing</li>
        <li>BigQuery and Cloud Machine Learning</li>
        <li>Cloud Spanner 101: Google's mission-critical relational database</li>
        <li>Container management and deployment: from development to production</li>
        <li>Extending the Google Assistant with Actions on Google</li>
        <li>Flexible development with the Google Maps APIs</li>
        <li>Google Infrastructure Security Design</li>
        <li>Introduction to Google Cloud Machine Learning</li>
        <li>Kubernetes and Google Container Engine: An introduction</li>
        <li>Microservices and Kubernetes</li>
        <li>Serverless computing options with Google Cloud Platform</li>
        <li>TensorFlow and Deep Learning for the rest of us</li>
        </ul>

        <h4>Web</h4>
        <ul>
        <li>Angular</li>
        <li>Polymer/Web Components</li>
        <li>Progressive Web Apps</li>
        <li>Accelerated Mobile Pages</li>
        <li>Developer Tooling</li>
        <li>Debugging</li>
        <li>Lighthouse</li>
        <li>Material Motion</li>
        <li>WebVR</li>
        <li>Testing</li>
        <li>Accessibility</li>
        </ul>

        <h4>Design</h4>
        <ul>
        <li>Material Design</li>
        <li>Voice User Interface (VUI) Design</li>
        <li>Multivariate Testing</li>
        <li>Notification Methodologies</li>
        <li>Machine Learning through a designer's lens</li>
        <li>Motion Design</li>
        <li>Component Design</li>
        <li>Collaboration with Dev &amp; QA Techniques and Tools</li>
        <li>Augmented Reality</li>
        <li>Mobile App Accessibility</li>
        <li>Responsive Web Design Patterns</li>
        </ul>


        <h4>Google Home / Google Assistant</h4>
        <ul>
        <li>Integration with API.AI</li>
        <li>IoT projects leveraging Google Assistant</li>
        </ul>

        <h4>Firebase</h4>
        <ul>
        <li>Large, complex and chaotic data structures</li>
        <li>Cloud functions</li>
        <li>E-Commerce integrations (eg Stripe)</li>
        <li>Deployment - Environment variables (or how to deploy without them)</li>
        <li>Enforcing schemas on the schema-less (because sometimes you just need them)</li>
        </ul>

        <h4>Technology Agnostic</h4>
        <ul>
        <li>Team building</li>
        <li>Code review</li>
        <li>Delegation</li>
        <li>Leading a technical team</li>
        <li>Remote work</li>
        </ul>

        <p>Note: JSConf EU graciously allowed us to use their awesome Call For Speakers as a basis for some areas of this CFS. Check out their conference. It's amazing.</p>


    </section>
  `,
    styles: []
})
export class SpeakerCfpComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
