import { Component } from '@angular/core';

@Component({
  selector: 'mix-visa-icon',
  template: `
    <svg
      width="56"
      height="19"
      viewBox="0 0 56 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <rect
        width="56"
        height="19"
        fill="url(#pattern0)"
      />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlink:href="#image0_137_6163"
            transform="scale(0.0178571 0.0526316)"
          />
        </pattern>
        <image
          id="image0_137_6163"
          width="56"
          height="19"
          xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAATCAYAAADF7c7rAAAACXBIWXMAAAsSAAALEgHS3X78AAAHo0lEQVRYhd1Xe1BTVxr/7k1IAgmQ8AoQQAKE8BB5C/hCcGstg2LpqrWyxd1q13W3O3W3s+3sbnfW3a61s62z06mt2h1rqaCOFQGtli2gRVRABARCMOTFQ2IgJIEQyPPe/cNJOLlEmP13v5nM3O/3vc7vPL5zghG9J14jDdJkABIHimA0phUTFLVC3Cu3qTYAgIsNQ5tvdKhfQLF3KnJOrUkOGXvrg+Y/zCzYA1144RpB2xt70m6ivjqDhX2hQfriXclEwSOdKW7cYudiAGSsL8OYGsJRrkuJbH+rMrPWW+1L14YKmx+OFlrsBNOFlRYIG3eXiltRPzqWfqQG5tRRoLha6VSeP0xatJEemZ7UEz68pNXAS5VSi5z9Qfpx25Qp26WnBLBUq8XB75vMdt9zkoljTpKkuWwFyeGH0dia+qHdf7ra87nWYg+m5pWbrSA3W0FpnB/2RrDxR3XRL2oeNJMkiaG4H4O2ikoQBwDAOLHjWPqRf9B3tMXrI373yYIjcNGDJHFysmsDtUj3wGRq25QpC8X25MSewXGMGJRNi1FyAAAJMTz3BFXVDu47ePHBBW/kUEkK5gx6w6sbpW9TyQEA9GpmcqiY57ak+VqcSb/8qLzlN4RkOnsRN8oyqYH1zcMVAOAuwqThtr3bU84CAMhHDMlLBpsQLAUA0OkXuH+u7/2MJBePBIZhZHF44L2fp0R+UyEOv5QfzOmlYRgh5AcsIShXz0TXqXUl3oj3zyyIdPqFQBSjU50iw9lThB+/v+TezvRz6TwoimkCwiDJRJeDIEi8vn98Hxr3SnxoXVQEZxIAQDlu9CAYxqTroyM5WgCA683KMp3VwUXtJ8uzKvfvSv0GxYZVxhjzvJ1DHV/N9cE3HQS5ZNwAACRJ4l192pxtm2ObXdiSxgIAkB8X2mwkaLD30Wa4P1EI5Gz/GiAdbo6NrSNFsjlrNBpTXpT4petbpZ1NQW1pPPaQ63vk6UwitV5CLHeIiomE3NGM1FCPFbTanD6XukfecOl0HHOURAX9gPr0yyZzUd0rwby0yBYAgAUCh4M9RTA+E+UHBmmSy36tVV6J+q8O9JVvK1ycNdn0nMcKxoX6u88fx5dhpNY7dKqtrvb74e3exoLKlZvD5ap5W4RL3ybg3dq8RnAN9ZGM6teuSHBTXlQrA8ftAABjDgYc6y4FcnogCwDAOGvjXBnWlqP+r64VnsFxjAQAsNqc9AHjQgJqXxUR4F6hlzYJr7pyu0RptkZWnLvfsONIw51b98fWPY/gpduyX6N6yVphdZo49AGKdWtmVl5BXiDTtDHM3x143sCH1keObACAusbhcpPdyXbZWDTcund78lcu/bFcH28jCAaaLz6K5yaYkhgs/9vWlHcw7NmEoNKkMW4o/fT2nff/dfc4tUt29WnTmp4a3d3c34dm3vmiqDY7LbwXnTD5vE0wMm4KX5YgAECeKKwJ1b/uZGUBAHzXqfoZiv9UFFYbEcbWuXSZ2rikg4piuR536G/3Z316enfOa3yWzzTVlyRJ/JN2xbsfnGz/K4pfvCk9RJKLXfvlBP5VbgDDxPGjW7J4fhIkAdYj0bpX8bkEC9IFHgRvaGwZwypjzPfjhiIPgsXiM6iuemJMQnUWDbeI4ngqav6Kl5Mvtv+zLPH3+fEfsem0ear9xH3Fu5pJcwjAs2NxQTJRgdq3b4yvcn2nRXIforYBuc59H3pttwAAG3IF7QE+NNOs3ekPADBrd/qfqOo6il7gGVy/oa2bVt1G49SaGY8VzOD6Pfah44S3GvxQP/3f317/3j558ukDJ25d79ab3d3X6iSYHb2avJ1bE76rqR+sNNgcAS4bA8ftUoUu+7F6OhMAYHrOGo7mHRzTr0yQyaTZiwW8O+ilWjWkeR31eTU/7hQ1TqHz7KAJod5fI6gkJQSpDhYnHf/Vtw+rKCYMAKD6nsKjudgIwucvzdIPn5evUzu78hYFAMhN5LegOvr6YNNp83t3JFMHBH0GsxjVhfxA9/k78uGtL769IdtpsTo9mtD8goPV9HB0F4phGEamikL6Gn9UF/UYzEvO9XIysWALfaw0xAIss4IAAOsyBS3wH4lX2x4x/3JokK8BxRQjM1FGuzMAxeKjnzUYu4OgfT3wZP/pR2OHuBcemHJC/Pt4fowpu5NgdDydWaux2EPQuJIoXpNIyB09frbj4/+FnEt6BrS54jieelmCuen83giWj45aHACgfIv4Syo2pNCnUDFRLG8QAECmNAgtToIFAGC0O/2bNMb1z6sb6cvQHT1YcHhk3BRxRTFVhtr+uDHx6IFdaSepMcf/3XnsTN/YAZcuUU7nAsDlZbcojmNkUUxQCxXPDWIPFK+LvkvFFWOeVwQdx+3JomA5AIBMtfQB7k0KwwI66t57YX1KYrD8fIPkTfROxTCM2F2S9FV4GHuK+ssQhbWheSRj+lyAFbYoAMBLBXHVVsezmXdjecJqb74+NMxatirY/ac2iM18ymLSbAAAW9bHtHwxZ3u9c1CzZUg7m66cs0QbbE6OLx23JHKYYxkCXudP8mMvlxYLG12PAM20OQrNJwhiKxKF3BFvtXPTw++WdS36snzoJgAAjCSXPCj+r+S/+fUaDF4mvugAAAAASUVORK5CYII="
        />
      </defs>
    </svg>
  `
})
export class VisaIconComponent {}
