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
    } else {
      return '';
    }
  };

  formatDetails = (jobOffer: JobOffer) => {
    const formattedLocation = this.formatLocation(jobOffer?.employer?.address);
    const formattedLevels = this.formatLevels(jobOffer?.levels);
    const contractType = jobOffer?.contractType;

    return `${formattedLocation} | ${formattedLevels} | ${contractType}`;
  };
}

export default JobOfferFormattingService;
