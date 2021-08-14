import { validateUrl } from '@utils/helpers/validators';
import { Address, Level, Maybe, JobOffer } from '@typings/graphql';

class JobOfferFormattingService {
  formatSalary = (minSalary?: number, maxSalary?: number) => {
    let convertedMinSalary = null;
    let convertedMaxSalary = null;

    if (minSalary) {
      convertedMinSalary = Math.round(minSalary / 1000);
    }
    if (maxSalary) {
      convertedMaxSalary = Math.round(maxSalary / 1000);
    }

    if (minSalary && maxSalary) {
      if (minSalary === maxSalary) {
        return `PLN ${convertedMinSalary}k`;
      }
      return `PLN ${convertedMinSalary}-${convertedMaxSalary}k`;
    } else if (minSalary && !maxSalary) {
      return `PLN ${convertedMinSalary}k`;
    } else if (!minSalary && maxSalary) {
      return `PLN ${convertedMaxSalary}k`;
    } else {
      return '';
    }
  };

  formatLocation = (address?: Address) => {
    if (address) {
      const { city, country } = address || {};

      if (city && country) {
        return `${city}, ${country}`;
      } else if (country && !city) {
        return country;
      } else if (!country && city) {
        return city;
      }
    } else {
      return '';
    }
  };

  formatLogo = (logo?: string | null) => {
    if (logo) {
      const isLogoUrlValid = validateUrl(logo);
      if (isLogoUrlValid) {
        return logo;
      } else {
        return `https://nofluffjobs.com/${logo}`;
      }
    } else {
      return '';
    }
  };

  private capitalizeFirstLetter(str?: string) {
    if (str) {
      return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
    }
    return str;
  }

  formatLevels = (levels?: Maybe<Maybe<Level>[]>) => {
    if (levels) {
      return levels
        .map((level) => this.capitalizeFirstLetter(level?.toLowerCase()))
        .join(', ');
    }
    return '';
  };

  formatTime = (updatedTime?: string) => {
    if (updatedTime) {
      const spaceIndex = updatedTime.indexOf(' ');
      const dateStr = updatedTime.slice(0, spaceIndex);
      const timeStr = updatedTime.slice(spaceIndex + 1, updatedTime.length);
      const [year, month, day] = dateStr.split('-');
      const [hours, minutes, seconds] = timeStr.split(':');
      let dateTime = new Date();

      dateTime.setFullYear(+year);
      dateTime.setMonth(+month - 1);
      dateTime.setDate(+day);
      dateTime.setHours(+hours);
      dateTime.setMinutes(+minutes);
      dateTime.setSeconds(+seconds);

      const updatedTimeDate = dateTime.getTime();
      const currentDate = new Date().getTime();
      const difference = currentDate - updatedTimeDate;
      const hoursDifference = Math.floor(difference / 1000 / 60 / 60);

      if (hoursDifference === 0) {
        return '<1h';
      } else if (hoursDifference <= 24) {
        return `${hoursDifference}h`;
      } else if (hoursDifference > 24) {
        return `${Math.floor(hoursDifference / 24)}d`;
      }
      return '';
    }
    return '';
  };

  formatDetails = (jobOffer: Maybe<JobOffer>) => {
    const formattedLocation = this.formatLocation(jobOffer?.employer?.address);
    const formattedLevels = this.formatLevels(jobOffer?.levels);
    const contractType = jobOffer?.contractType;

    return `${formattedLocation} | ${formattedLevels} | ${contractType}`;
  };

  lowerAndCapitalizeFirstLetter = (str: string) => {
    return this.capitalizeFirstLetter(str.toLowerCase());
  };
}

export default JobOfferFormattingService;
